#!/bin/bash

# Urban Assist - Docker Management Script
# This script helps manage the containerized backend services

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored messages
print_message() {
    echo -e "${2}${1}${NC}"
}

# Function to check if MySQL is running
check_mysql() {
    print_message "Checking MySQL status..." "$BLUE"
    if lsof -ti:3306 > /dev/null 2>&1; then
        print_message "✓ MySQL is running on port 3306" "$GREEN"
        return 0
    else
        print_message "✗ MySQL is NOT running on port 3306" "$RED"
        print_message "Please start MySQL before running the containers" "$YELLOW"
        return 1
    fi
}

# Function to check if frontend is running
check_frontend() {
    if lsof -ti:5173 > /dev/null 2>&1; then
        print_message "✓ Frontend is running on port 5173" "$GREEN"
    else
        print_message "⚠ Frontend is NOT running on port 5173" "$YELLOW"
        print_message "Start frontend with: cd frontend && npm run dev" "$YELLOW"
    fi
}

# Function to build and start containers
start_containers() {
    print_message "\n🚀 Building and starting all backend services..." "$BLUE"
    docker-compose up --build -d
    print_message "✓ All services started successfully!" "$GREEN"
    print_message "\nView logs with: docker-compose logs -f" "$YELLOW"
}

# Function to stop containers
stop_containers() {
    print_message "\n🛑 Stopping all backend services..." "$BLUE"
    docker-compose down
    print_message "✓ All services stopped" "$GREEN"
}

# Function to show service status
show_status() {
    print_message "\n📊 Service Status:" "$BLUE"
    docker-compose ps
    
    print_message "\n🔌 Port Status:" "$BLUE"
    echo "Frontend (5173):       $(lsof -ti:5173 > /dev/null 2>&1 && echo '✓ RUNNING' || echo '✗ NOT RUNNING')"
    echo "User-Auth (8081):      $(lsof -ti:8081 > /dev/null 2>&1 && echo '✓ RUNNING' || echo '✗ NOT RUNNING')"
    echo "UserManagement (8083): $(lsof -ti:8083 > /dev/null 2>&1 && echo '✓ RUNNING' || echo '✗ NOT RUNNING')"
    echo "Reviews (8002):        $(lsof -ti:8002 > /dev/null 2>&1 && echo '✓ RUNNING' || echo '✗ NOT RUNNING')"
    echo "Email (8001):          $(lsof -ti:8001 > /dev/null 2>&1 && echo '✓ RUNNING' || echo '✗ NOT RUNNING')"
    echo "Payment (5000):        $(lsof -ti:5000 > /dev/null 2>&1 && echo '✓ RUNNING' || echo '✗ NOT RUNNING')"
    echo "MySQL (3306):          $(lsof -ti:3306 > /dev/null 2>&1 && echo '✓ RUNNING' || echo '✗ NOT RUNNING')"
}

# Function to show logs
show_logs() {
    if [ -z "$1" ]; then
        print_message "\n📋 Showing logs for all services (Ctrl+C to exit)..." "$BLUE"
        docker-compose logs -f
    else
        print_message "\n📋 Showing logs for $1 (Ctrl+C to exit)..." "$BLUE"
        docker-compose logs -f "$1"
    fi
}

# Function to restart a service
restart_service() {
    if [ -z "$1" ]; then
        print_message "Please specify a service to restart" "$RED"
        print_message "Available services: user-auth, user-management, reviews, email, payment" "$YELLOW"
        return 1
    fi
    print_message "\n🔄 Restarting $1..." "$BLUE"
    docker-compose restart "$1"
    print_message "✓ $1 restarted successfully" "$GREEN"
}

# Function to rebuild a service
rebuild_service() {
    if [ -z "$1" ]; then
        print_message "Please specify a service to rebuild" "$RED"
        print_message "Available services: user-auth, user-management, reviews, email, payment" "$YELLOW"
        return 1
    fi
    print_message "\n🔨 Rebuilding $1..." "$BLUE"
    docker-compose up -d --build "$1"
    print_message "✓ $1 rebuilt successfully" "$GREEN"
}

# Function to clean up everything
cleanup() {
    print_message "\n🧹 Cleaning up Docker resources..." "$BLUE"
    docker-compose down -v
    print_message "✓ Cleanup complete" "$GREEN"
}

# Main menu
show_menu() {
    echo ""
    print_message "╔════════════════════════════════════════╗" "$BLUE"
    print_message "║   Urban Assist - Docker Manager       ║" "$BLUE"
    print_message "╚════════════════════════════════════════╝" "$BLUE"
    echo ""
    echo "1) Start all services"
    echo "2) Stop all services"
    echo "3) Show status"
    echo "4) Show logs (all)"
    echo "5) Show logs (specific service)"
    echo "6) Restart service"
    echo "7) Rebuild service"
    echo "8) Clean up"
    echo "9) Exit"
    echo ""
}

# Main script logic
case "$1" in
    start)
        check_mysql && start_containers
        ;;
    stop)
        stop_containers
        ;;
    status)
        show_status
        ;;
    logs)
        show_logs "$2"
        ;;
    restart)
        restart_service "$2"
        ;;
    rebuild)
        rebuild_service "$2"
        ;;
    cleanup)
        cleanup
        ;;
    *)
        show_menu
        read -p "Enter choice [1-9]: " choice
        case $choice in
            1) check_mysql && start_containers ;;
            2) stop_containers ;;
            3) show_status ;;
            4) show_logs ;;
            5) 
                echo "Available services: user-auth, user-management, reviews, email, payment"
                read -p "Enter service name: " service
                show_logs "$service"
                ;;
            6)
                echo "Available services: user-auth, user-management, reviews, email, payment"
                read -p "Enter service name: " service
                restart_service "$service"
                ;;
            7)
                echo "Available services: user-auth, user-management, reviews, email, payment"
                read -p "Enter service name: " service
                rebuild_service "$service"
                ;;
            8) cleanup ;;
            9) exit 0 ;;
            *) print_message "Invalid option" "$RED" ;;
        esac
        ;;
esac
