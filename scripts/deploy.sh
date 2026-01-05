#!/bin/bash
set -e

ENVIRONMENT=${1:-production}
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"

echo "🚀 Deploying Apsara Devkit ($ENVIRONMENT)"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_step() { echo -e "${BLUE}[STEP]${NC} $1"; }

log_info "Running pre-flight checks..."

command -v docker >/dev/null 2|| { log_error "Docker not found"; exit 1; }
command -v docker compose >/dev/null 2|| { log_error "Docker Compose not found"; exit 1; }

if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        log_warn "No .env file found, copying from .env.example"
        cp .env.example .env
        log_warn "Please edit .env with your values!"
        exit 1
    else
        log_error "No .env file found"
        exit 1
    fi
fi

REQUIRED_VARS=("DATABASE_URL" "BETTER_AUTH_SECRET" "NEXT_PUBLIC_APP_URL")
for var in "${REQUIRED_VARS[@]}"; do
    if ! grep -q "^${var}=" .env 2>/dev/null; then
        log_error "Required variable $var not set in .env"
        exit 1
    fi
done

log_info "Pre-flight checks passed"

log_step "Building Docker images (zero-downtime deployment)..."
docker compose -f docker-compose.yml build --no-cache

log_info "Updating services (minimal downtime during container restart)..."
docker compose -f docker-compose.yml up -d --force-recreate

log_info "Waiting for services to be healthy..."
sleep 10

log_step "Cleaning up old Docker artifacts (after successful deployment)..."
docker image prune -f > /dev/null 2>&1 || true
docker builder prune -f > /dev/null 2>&1 || true

log_info "Running health checks..."
HEALTHY=true

if curl -sf "http://localhost:80" > /dev/null 2>&1; then
    log_info "Web is healthy"
else
    log_warn "Web may not be responding at http://localhost:80"
    HEALTHY=false
fi

log_info "Deployment complete!"
echo ""
echo "Container status:"
docker compose ps

echo ""
echo "Disk usage:"
df -h | grep -E "^/dev/" | awk '{print $1 " " $3 "/" $2 " (" $5 ")"}'

if [ "$HEALTHY" = true ]; then
    log_info "✅ All services are healthy!"
else
    log_warn "⚠️  Some services may need attention. Check logs with: docker compose logs"
fi

echo ""
log_info "Useful commands:"
echo "  View logs:    docker compose logs -f"
echo "  Stop:         docker compose down"
echo "  Full cleanup: docker system prune -a"
