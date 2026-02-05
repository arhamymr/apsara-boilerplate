# Database Setup Guide

## Problem: PostgreSQL is not running!

The Better Auth backend requires PostgreSQL to be running. Here's how to set it up:

## Option 1: Docker (Recommended - Fastest)

### Quick Start

```bash
# Run PostgreSQL in Docker
docker run -d \
  --name apsara-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=backend \
  -p 5432:5432 \
  postgres:16-alpine

# Verify it's running
docker ps | grep apsara-postgres
```

### Or if container already exists

```bash
# Start existing container
docker start apsara-postgres

# Check logs
docker logs apsara-postgres
```

## Option 2: Local PostgreSQL Installation

### Windows

1. Download from: https://www.postgresql.org/download/windows/
2. Install with default settings
3. Remember your password (default: postgres)

### Or using Chocolatey

```powershell
choco install postgresql
```

### macOS

```bash
brew install postgresql@16
brew services start postgresql@16
```

### Linux

```bash
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

## Option 3: Neon (Serverless - Free)

Neon is a free serverless PostgreSQL that works great for development:

```bash
# Install neonctl
npm i -g neonctl

# Create database
neonctl projects create apsara-backend

# Get connection string and update .env file
```

## Verify PostgreSQL is Running

```bash
# Test connection
docker exec apsara-postgres psql -U postgres -d backend -c "SELECT 1"

# Or if installed locally
psql postgres://postgres:postgres@localhost:5432/backend -c "SELECT 1"
```

## Once PostgreSQL is Running

### Step 1: Reset Database Schema

```bash
cd apps/backend
npx tsx scripts/reset-database.ts
```

### Step 2: Start Backend

```bash
pnpm dev
```

### Step 3: Test Registration

Open http://localhost:1111/register

## Troubleshooting

### "Connection refused"

- PostgreSQL is not running
- Start it with: `docker start apsara-postgres`

### "Database does not exist"

- Create it: `docker exec apsara-postgres psql -U postgres -c "CREATE DATABASE backend"`

### "Password authentication failed"

- Check password in .env matches PostgreSQL password
- Default: postgres/postgres

## Quick Fix Script

Save this as `setup-db.sh`:

```bash
#!/bin/bash
echo "🐳 Starting PostgreSQL..."
docker run -d \
  --name apsara-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=backend \
  -p 5432:5432 \
  postgres:16-alpine

echo "⏳ Waiting for PostgreSQL to start..."
sleep 5

echo "🔄 Setting up schema..."
cd apps/backend
npx tsx scripts/reset-database.ts

echo "✅ Database ready!"
```

Run it:

```bash
chmod +x setup-db.sh
./setup-db.sh
```

## Current Status

- ✅ Backend configured and running on port 2222
- ✅ Better Auth properly set up
- ✅ Health endpoint working
- ❌ PostgreSQL not running
- ❌ Database tables not created

**Next: Start PostgreSQL and run the reset script!**
