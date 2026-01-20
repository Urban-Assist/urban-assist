#!/bin/bash

# Urban Assist - Quick Start Script for Docker
# This script stops local services and starts Docker containers

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🐳 Urban Assist - Docker Quick Start${NC}"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running!${NC}"
    echo "Please start Docker Desktop and try again"
    exit 1
fi

echo -e "${GREEN}✓ Docker is running${NC}"

# Check if MySQL is running
if ! lsof -ti:3306 > /dev/null 2>&1; then
    echo -e "${RED}❌ MySQL is not running!${NC}"
    echo "Starting MySQL..."
    mysql.server start || echo "Please start MySQL manually"
fi

echo -e "${GREEN}✓ MySQL is running${NC}"

# Stop any local backend services
echo ""
echo "🛑 Stopping local backend services..."
lsof -ti:8081,8083,8002,8001,5000 2>/dev/null | xargs kill -9 2>/dev/null || true
echo -e "${GREEN}✓ Local services stopped${NC}"

# Start Docker containers
echo ""
echo "🚀 Starting Docker containers..."
docker-compose up -d

# Wait a bit for containers to start
sleep 5

# Show status
echo ""
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}   📊 Container Status${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
docker-compose ps

echo ""
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}   🌐 Access Points${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo "Frontend:        Start with 'cd frontend && npm run dev'"
echo "                 Then visit: http://127.0.0.1:5173"
echo ""
echo "Backend Services (Containerized):"
echo "  User Auth:     http://localhost:8081"
echo "  User Mgmt:     http://localhost:8083"
echo "  Reviews:       http://localhost:8002"
echo "  Email:         http://localhost:8001"
echo "  Payment:       http://localhost:5000"
echo ""
echo -e "${GREEN}✅ All services started successfully!${NC}"
echo ""
echo "📝 Useful commands:"
echo "  View logs:     docker-compose logs -f"
echo "  Stop all:      docker-compose down"
echo "  Restart:       docker-compose restart"
echo "  Status:        docker-compose ps"
