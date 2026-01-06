#!/bin/bash
set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"

echo "🧹 Cleaning up Docker artifacts and freeing ports"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_step() { echo -e "${BLUE}[STEP]${NC} $1"; }

# Define ports used by the application
PORTS=(80 3000 2222)

log_step "Stopping and removing all Docker containers..."
docker compose down --remove-orphans 2>/dev/null || true
docker stop $(docker ps -aq) 2>/dev/null || true
docker rm $(docker ps -aq) 2>/dev/null || true

log_step "Removing Docker networks..."
docker network prune -f 2>/dev/null || true

log_step "Killing processes using ports 80, 3000, and 2222..."
for port in "${PORTS[@]}"; do
    # Kill processes using the port
    lsof -ti:$port | xargs kill -9 2>/dev/null || true
    
    # Also check for fuser if lsof doesn't work
    fuser -k $port/tcp 2>/dev/null || true
    
    log_info "Cleared port $port"
done

log_step "Removing unused Docker images and volumes..."
docker image prune -f 2>/dev/null || true
docker volume prune -f 2>/dev/null || true

log_step "Cleaning up Docker system..."
docker system prune -f 2>/dev/null || true

log_info "✅ Cleanup complete! Ports are free for deployment."