#!/bin/bash

echo "🔍 Checking PostgreSQL..."
if ! netstat -ano | findstr ":5432" > /dev/null 2>&1; then
    echo "❌ PostgreSQL is not running on port 5432"
    echo ""
    echo "Please start PostgreSQL first:"
    echo "  - If using Docker: docker start <postgres-container-name>"
    echo "  - If installed locally: Start the PostgreSQL service"
    echo ""
    exit 1
else
    echo "✅ PostgreSQL is running"
fi

echo ""
echo "🚀 Starting backend server..."
cd apps/backend
pnpm dev &
BACKEND_PID=$!

echo "Waiting for backend to start..."
sleep 3

if curl -s http://localhost:2222/health > /dev/null 2>&1; then
    echo "✅ Backend started successfully on port 2222"
    echo ""
    echo "📝 Next steps:"
    echo "  1. Open http://localhost:1111/register"
    echo "  2. Try registering a new account"
    echo "  3. Check browser console for any errors"
    echo ""
else
    echo "❌ Backend failed to start. Check for errors above."
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi
