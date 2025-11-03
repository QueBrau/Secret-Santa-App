#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎅 Secret Santa App - Starting Both Servers${NC}"
echo ""

# Check if .env exists
if [ ! -f "server/.env" ]; then
    echo -e "${YELLOW}⚠️  Warning: server/.env not found!${NC}"
    echo "SMS functionality will not work without Twilio credentials."
    echo "Copy server/.env.example to server/.env and add your credentials."
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo -e "${GREEN}Starting backend server on http://localhost:3001${NC}"
cd server && npm start &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 2

echo -e "${GREEN}Starting frontend app on http://localhost:3000${NC}"
cd .. && npm start &
FRONTEND_PID=$!

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

echo ""
echo -e "${BLUE}✨ Both servers are running!${NC}"
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for processes
wait
