# 🐳 Docker Containerization - Urban Assist Backend

This document explains the Docker containerization setup for all Urban Assist backend services.

## 📋 Overview

The Urban Assist application is now containerized with the following architecture:

```
┌─────────────────┐
│   Frontend      │ (Running locally on 127.0.0.1:5173)
│   React + Vite  │
└────────┬────────┘
         │
         ↓ HTTP Requests
┌────────────────────────────────────────────────┐
│        Docker Container Network                │
│                                                │
│  ┌──────────────┐  ┌──────────────┐          │
│  │  user-auth   │  │  user-mgmt   │          │
│  │  Port: 8081  │  │  Port: 8083  │          │
│  └──────────────┘  └──────────────┘          │
│                                                │
│  ┌──────────────┐  ┌──────────────┐          │
│  │   reviews    │  │    email     │          │
│  │  Port: 8002  │  │  Port: 8001  │          │
│  └──────────────┘  └──────────────┘          │
│                                                │
│  ┌──────────────┐                             │
│  │   payment    │                             │
│  │  Port: 5000  │                             │
│  └──────────────┘                             │
│                                                │
└───────────┬────────────────────────────────────┘
            │
            ↓ Database Queries
┌───────────────────┐
│   MySQL Server    │ (Running locally on 127.0.0.1:3306)
│   Database: demo  │
└───────────────────┘
```

## 🎯 Benefits

- ✅ **No more multiple terminal windows** - All backend services run together
- ✅ **Consistent environment** - Same setup works everywhere
- ✅ **Easy deployment** - Single command to start everything
- ✅ **Auto-restart** - Services automatically restart on failure
- ✅ **Service discovery** - Services communicate using container names
- ✅ **Isolated networking** - Each service in its own container

## 📦 What's Containerized

All backend services are containerized:

1. **user-auth** (Spring Boot) - Port 8081
2. **userManagement** (Spring Boot) - Port 8083
3. **reviews** (Node.js) - Port 8002
4. **email** (Node.js) - Port 8001
5. **payment** (Node.js) - Port 5000

**What's NOT containerized:**
- Frontend (React + Vite) - Runs locally for faster development
- MySQL Database - Runs locally for data persistence

## 🚀 Quick Start

### Prerequisites

1. **Docker Desktop** installed and running
2. **MySQL** running locally on port 3306
3. **Frontend** dependencies installed (`cd frontend && npm install`)

### Start Everything

```bash
# Option 1: Using the management script (recommended)
./docker-manager.sh start

# Option 2: Using docker-compose directly
docker-compose up -d --build
```

### Check Status

```bash
# Using the management script
./docker-manager.sh status

# Or manually
docker-compose ps
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f user-auth
docker-compose logs -f reviews
```

### Stop Everything

```bash
# Using the management script
./docker-manager.sh stop

# Or directly
docker-compose down
```

## 🛠️ Docker Management Script

The `docker-manager.sh` script provides an easy way to manage all services:

```bash
./docker-manager.sh start      # Start all services
./docker-manager.sh stop       # Stop all services
./docker-manager.sh status     # Show service status
./docker-manager.sh logs       # Show all logs
./docker-manager.sh logs reviews  # Show logs for specific service
./docker-manager.sh restart reviews  # Restart specific service
./docker-manager.sh rebuild reviews  # Rebuild specific service
./docker-manager.sh cleanup    # Remove all containers and volumes
```

Or run it without arguments for an interactive menu:
```bash
./docker-manager.sh
```

## 📝 Development Workflow

### Local Development (Old Way)

```bash
# Terminal 1
cd user-auth && mvn spring-boot:run

# Terminal 2
cd userManagement && mvn spring-boot:run

# Terminal 3
cd reviews && npm start

# Terminal 4
cd frontend && npm run dev
```

### Docker Development (New Way)

```bash
# Terminal 1 - Start all backend services
docker-compose up -d

# Terminal 2 - Start frontend
cd frontend && npm run dev

# Done! All services running with just 2 commands
```

## 🔧 Configuration

### Environment Variables

All environment variables are defined in `docker-compose.yml`. The containers use:

- **Database Host**: `host.docker.internal` (to access local MySQL)
- **Service URLs**: Container names (e.g., `http://user-auth:8081`)
- **CORS Origins**: Configured to accept requests from `http://127.0.0.1:5173`

### Service Communication

- **Frontend → Backend**: Uses `localhost:<port>` (e.g., `http://localhost:8081`)
- **Backend → Backend**: Uses container names (e.g., `http://user-auth:8081`)
- **Backend → MySQL**: Uses `host.docker.internal:3306`

## 🐛 Troubleshooting

### Service won't start

```bash
# Check logs
docker-compose logs <service-name>

# Restart the service
docker-compose restart <service-name>

# Rebuild the service
docker-compose up -d --build <service-name>
```

### MySQL connection issues

```bash
# Check MySQL is running
mysql.server status

# Test connection from container
docker-compose exec user-auth ping host.docker.internal
```

### Port already in use

```bash
# Find what's using the port
lsof -ti:<port>

# Kill the process
lsof -ti:<port> | xargs kill -9

# Restart Docker services
docker-compose down && docker-compose up -d
```

### Clean slate rebuild

```bash
# Stop and remove everything
docker-compose down -v

# Rebuild from scratch
docker-compose build --no-cache

# Start fresh
docker-compose up -d
```

## 📂 Docker Files

- **`Dockerfile`** in each service directory - Defines how to build the container
- **`docker-compose.yml`** - Orchestrates all services together
- **`.dockerignore`** - Excludes files from the build context
- **`docker-manager.sh`** - Management script for easy operations

## 🔍 Useful Commands

```bash
# View running containers
docker ps

# Stop all containers
docker-compose down

# Remove all stopped containers
docker container prune

# View service logs
docker-compose logs -f <service>

# Execute command in container
docker-compose exec <service> sh

# View resource usage
docker stats

# Rebuild without cache
docker-compose build --no-cache <service>
```

## 🎓 Testing the Setup

After starting the containers:

1. **Check all services are running**:
   ```bash
   ./docker-manager.sh status
   ```

2. **Start the frontend**:
   ```bash
   cd frontend && npm run dev
   ```

3. **Access the application**:
   Open http://127.0.0.1:5173 in your browser

4. **Test functionality**:
   - Login/Register
   - Browse services
   - View provider profiles
   - Submit reviews
   - All features should work exactly as before!

## 📚 Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Debugging Docker Containers](https://docs.docker.com/config/containers/logging/)

## ⚠️ Important Notes

- Always ensure MySQL is running before starting Docker containers
- The first build will take longer as it downloads dependencies
- Subsequent starts are much faster
- Changes to code require rebuilding the specific service container
- Frontend hot-reload still works as it runs locally

## 🎉 Benefits Summary

- **Simplified Setup**: One command instead of managing 5+ terminals
- **Environment Consistency**: Same configuration everywhere
- **Easy Troubleshooting**: Centralized logging and status checking
- **Production Ready**: Same containerization can be used for deployment
- **Team Onboarding**: New developers can start quickly

---

Need help? Run `./docker-manager.sh` for the interactive menu!
