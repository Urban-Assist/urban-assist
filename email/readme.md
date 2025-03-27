<div align="center">
  
# 📧 Email Microservice

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/username/urban-assist)
[![Node](https://img.shields.io/badge/node-%3E%3D%2014.0.0-green.svg)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-ISC-red.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

<img src="https://raw.githubusercontent.com/amplication/amplication/master/apps/amplication/src/static/img/email-service.svg" alt="Email Service Logo" width="200"/>

*Reliable, scalable email operations for Urban Assist platform*

[Getting Started](#-getting-started) •
[Installation](#-installation) •
[Configuration](#-configuration) •
[API](#-api-endpoints) •
[Docker](#-docker) •
[Kubernetes](#-kubernetes) •
[Contributing](#-contributing)

</div>

<p align="center">
  <img src="https://i.imgur.com/9Jz1SJs.gif" alt="Email Service Animation" width="600">
</p>

---

## 📚 Overview

This microservice handles all email operations within the Urban Assist application. Built with Node.js and Express, it utilizes Nodemailer for robust email delivery capabilities.

<details>
<summary>✨ Key Features</summary>

- **Reliable Email Delivery** - Ensures emails reach their destination
- **HTML Email Support** - Rich-content emails with full HTML formatting
- **Attachment Handling** - Send documents, images, and more
- **Queueing** - Handles email backlogs during high traffic
- **Logging** - Detailed logs of all email activities
- **Auto-scaling** - Dynamically scales with demand in Kubernetes environments
- **High Availability** - Multi-node deployment for failover protection
- **Rolling Updates** - Zero-downtime deployments with Kubernetes
- **Resource Efficiency** - Optimized container footprint for better resource utilization

</details>

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (v14 or higher): [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js): Package manager for dependencies
- **Git**: [Download Git](https://git-scm.com/downloads) for version control

### 📦 Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the email directory**:

   ```bash
   cd urban-assist/email
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

<p align="center">
  <img src="https://i.imgur.com/VlUlNBP.gif" alt="Installation Animation" width="500">
</p>

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `email` directory with the following variables:

```plaintext
EMAIL_MICROSERVICE_PORT=9001
EMAIL_ADDRESS=your-email@example.com
MAIL_ACCESS_TOKEN=your-email-app-password
ENV_MODE=development
```

<details>
<summary>🔐 How to Get Gmail App Password</summary>

1. **Sign in to your Google Account**:
   - Go to [myaccount.google.com](https://myaccount.google.com/)

2. **Enable 2-Step Verification**:
   - Navigate to Security → 2-Step Verification
   - Follow setup instructions if not already enabled

3. **Generate App Password**:
   - Go to Security → App passwords
   - Select "Mail" from the dropdown
   - Name it "Urban Assist Email Service"
   - Click "Generate" and copy the 16-character password

4. **Security Note**:
   - Keep this password secure
   - Use environment variables in production

</details>

---

## 🏃‍♂️ Running the Service

Choose the mode that best fits your needs:

| Command | Description |
|---------|-------------|
| `npm run dev` | Development mode with auto-restart |
| `npm run prod` | Production mode for deployment |
| `npm test` | Run the test suite |

<p align="center">
  <img src="https://i.imgur.com/Y2Yr6Mk.gif" alt="Server Running Animation" width="500">
</p>

---

## 🐳 Docker

Run the service using Docker:

```bash
# Build the image
docker build -t email-service .

# Run the container
docker run -p 9001:9001 --env-file .env email-service
```

---

## ☸️ Kubernetes

Deploy the service to Kubernetes for advanced orchestration capabilities:

```bash
# Apply deployment config
kubectl apply -f kubernetes/deployment.yaml

# Apply service config
kubectl apply -f kubernetes/service.yaml

# Check deployment status
kubectl get deployments
```

### Kubernetes Features

| Feature | Description | Impact |
|---------|-------------|--------|
| **Auto-scaling** | Dynamically scales pods based on CPU/memory usage | Handles traffic spikes efficiently |
| **Self-healing** | Automatically restarts failed containers | Improves uptime and reliability |
| **Rolling updates** | Updates containers without downtime | Ensures continuous service availability |
| **Load balancing** | Distributes traffic across pods | Optimizes resource usage |
| **Resource limits** | Controls CPU and memory allocation | Prevents resource starvation |

<p align="center">
  <img src="https://i.imgur.com/SQTnplb.gif" alt="Kubernetes Deployment Animation" width="600">
</p>

---

## 📡 API Endpoints

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|-------------|----------|
| `/mail/send` | POST | Send an email | `{ "to": "recipient@email.com", "subject": "Hello", "text": "<p>HTML Message</p>" }` | `{ "message": "Email sent successfully", "status": 200 }` |
| `/health` | GET | Health check | - | `{ "status": "ok", "uptime": "10h 30m" }` |

### Example Request

```bash
curl -X POST http://localhost:9001/mail/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "user@example.com",
    "subject": "Welcome to Urban Assist",
    "text": "<h1>Welcome!</h1><p>Thank you for joining Urban Assist.</p>"
  }'
```

---

## 📊 Monitoring & Logs

The service includes comprehensive logging and monitoring capabilities:

- **Winston**: For structured logging
- **Prometheus**: For metrics collection
- **Health Checks**: Regular service status reports
- **Kubernetes Dashboard**: Visual interface for cluster monitoring
- **Pod Metrics**: Real-time resource usage statistics

---

## 🛠 Technologies

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-30B980?style=for-the-badge&logo=gmail&logoColor=white)](https://nodemailer.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)

</div>

<p align="center">
  <img src="https://i.imgur.com/GPKhPvR.gif" alt="Tech Stack Animation" width="600">
</p>

---

## 🚢 Deployment Impact Features

| Feature | Description | Business Impact |
|---------|-------------|----------------|
| **Circuit Breaking** | Prevents cascading failures across services | Improves system resilience during partial outages |
| **Blue/Green Deployment** | Zero-downtime deployments with instant rollback | Reduces deployment risk and customer impact |
| **Infrastructure as Code** | Kubernetes manifests for consistent deployments | Eliminates environment inconsistencies |
| **Horizontal Pod Autoscaler** | Automatically scales based on CPU/memory metrics | Optimizes cost while maintaining performance |
| **Graceful Shutdown** | Properly closes connections on termination | Prevents data loss during deployments |
| **Pod Disruption Budget** | Ensures minimum availability during updates | Maintains SLAs during cluster maintenance |
| **ConfigMaps & Secrets** | Externalized configuration management | Simplifies environment-specific settings |

---

## 👥 Contributing

Contributions are always welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Urban Assist Platform** • Created with ❤️ by the Urban Assist Team

<p align="center">
  <img src="https://i.imgur.com/JrXn4H5.gif" alt="Thank You Animation" width="300">
</p>

</div>
