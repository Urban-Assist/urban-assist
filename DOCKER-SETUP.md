# Docker Compose Setup Guide

## Prerequisites
- Docker and Docker Compose installed
- MySQL running locally on port 3306
- Frontend running locally on port 5173

## Quick Start

### 1. Build and start all backend services:
```bash
docker-compose up --build
```

### 2. Or run in detached mode:
```bash
docker-compose up -d --build
```

### 3. View logs:
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f user-auth
docker-compose logs -f user-management
docker-compose logs -f reviews
```

### 4. Stop all services:
```bash
docker-compose down
```

### 5. Rebuild specific service:
```bash
docker-compose up -d --build user-auth
```

## Service Ports
- **user-auth**: 8081
- **user-management**: 8083
- **reviews**: 8002
- **email**: 8001
- **payment**: 5000

## Architecture
```
Frontend (Local) → Backend Services (Docker) → MySQL (Local)
127.0.0.1:5173   → Container Network      → 127.0.0.1:3306
```

## Networking
- Backend services communicate with each other using service names (e.g., `http://user-auth:8081`)
- Backend services access MySQL using `host.docker.internal:3306`
- Frontend accesses backend services via `localhost:<port>`

## Troubleshooting

### Check service status:
```bash
docker-compose ps
```

### Check if MySQL is accessible from containers:
```bash
docker-compose exec user-auth ping host.docker.internal
```

### Restart a specific service:
```bash
docker-compose restart reviews
```

### View service health:
```bash
docker inspect urban-assist-user-auth | grep -A 10 Health
```

### Clean rebuild:
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Development vs Docker

### Local Development (current setup):
- Run services with `mvn spring-boot:run` or `npm start`
- Services at localhost:8081, 8083, 8002, etc.

### Docker Setup (new):
- Run services with `docker-compose up`
- Services still accessible at localhost:8081, 8083, 8002, etc.
- No need to manage multiple terminal windows

## Notes
- MySQL must be running locally before starting Docker services
- Frontend still runs locally - no changes needed
- All backend services restart automatically on failure
