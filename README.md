# Urban Assist - Project Documentation

## 📌 Problem Statement
Urban Assist addresses the challenge of fragmented service discovery and booking in urban environments. Our platform streamlines the process of finding, booking, and paying for various urban services through a unified, secure, and user-friendly interface. By connecting service providers with consumers, Urban Assist eliminates inefficiencies in service discovery, reduces booking friction, and creates a reliable marketplace for urban services.

---

## 🎯 Project Goals
1. **Unified Platform**: Create a single platform for users to discover, book, and pay for urban services.
2. **User Experience**: Provide a seamless and intuitive user interface for both service providers and consumers.
3. **Scalability**: Design a system that can handle a growing number of users and services.
4. **Security**: Ensure secure transactions and protect user data through robust authentication and encryption.
5. **Real-Time Communication**: Enable real-time communication between users and service providers.

---

## 🚀 Core Features

### 📋 Service Discovery & Listing
- Comprehensive service catalog with advanced search capabilities.
- Detailed service listings with provider profiles, ratings, and reviews.
- Admin approval workflow for quality control of listed services.

### 🔐 User Authentication & Management
- Secure JWT-based authentication system.
- OAuth integration for third-party login options.
- Role-based access control for users, service providers, and administrators.
- User profile management with service history.

### 📅 Booking System
- Real-time availability checking.
- Seamless booking process with calendar integration.
- Appointment management for both service providers and consumers.
- Automated notifications and reminders.

### 💳 Payment Processing
- Integration with multiple payment gateways.
- Secure transaction processing.
- Payment history and receipts.
- Support for various payment methods.

### 💬 Communication Tools
- Real-time chat functionality between users and service providers.
- Video calling capabilities for remote consultations.
- Message history and notification management.
- File sharing for relevant documentation.

---

## 🛠️ Technology Stack

### Frontend
- **React**: JavaScript library for building the user interface.
- **Vite**: Next-generation frontend tooling for faster development.
- **Tailwind CSS**: Utility-first CSS framework for styling.

### Backend
- **Node.js**: JavaScript runtime for API servers.
- **Spring Boot**: Java-based framework for microservices.
- **MySQL**: Relational database for persistent data storage.
- **Firebase**: Platform for authentication, real-time database, and cloud storage.

### Communication & Integration
- **REST APIs**: For structured service-to-service communication.
- **RabbitMQ**: Message broker for asynchronous communication between services.
- **WebSocket**: For real-time bidirectional communication.
- **WebRTC**: For peer-to-peer video and audio communication.

### DevOps & Infrastructure
- **Docker**: Containerization platform for consistent deployment.
- **Kubernetes**: Container orchestration for scaling and management.
- **CI/CD Pipeline**: Automated build and deployment workflow.

### Payment Integration
- **Stripe**: Payment processing platform.

---
## 🚀 Architecture Overview
![architectureal flow](https://github.com/user-attachments/assets/1b191719-80ea-4a0e-bb1f-f9187e56b5a1)


## 📐 Design Principles

Our application follows these key principles:

- **Simplicity**: Clean codebase with consistent naming conventions and modular architecture.
- **12-Factor App Principles**: Separation of configuration from code, treating backing services as attached resources.
- **Use of Containers**: Docker for packaging microservices and Kubernetes for orchestration.
- **REST Architectural Constraints**: Stateless communication, standardized HTTP methods, and proper resource naming.
- **Accessible Rich Internet Applications (ARIA)**: Semantic HTML, ARIA attributes, and keyboard navigation.

---
## 🚀 Architecture Overview

---
## 🔁 Application Flow

### 1. User Registration & Authentication
- Users register through the platform or use OAuth providers.
- Authentication service validates credentials and issues JWT tokens.
- Role-based permissions are assigned based on user type.

### 2. Service Discovery
- Users search for services using the search functionality.
- Filtering options allow users to refine search results.
- Users can view detailed service information and provider profiles.

### 3. Service Listing (For Providers)
- Service providers create detailed listings of their services.
- Submissions enter an approval queue for admin review.
- After validation, services become available in search results.
- Providers can manage their service listings through a dashboard.

### 4. Booking Process
- Users select a service and check real-time availability.
- Users choose a suitable time slot for the service.
- Booking request is processed through the booking service.
- Both provider and consumer receive confirmation notifications.

### 5. Payment Handling
- Upon booking confirmation, users are directed to payment options.
- Stripe integration processes payment securely.
- Payment confirmation is sent to both parties.
- Transaction records are stored in the database.

### 6. Communication
- Users and providers can communicate through in-app chat.
- Video calling option is available for remote consultations.
- Message history is maintained for reference.
- Notifications alert users about new messages.

---

## 🧱 Microservices Architecture

### Authentication Service
- Handles user registration, login, and session management.
- JWT token generation and validation.
- OAuth integration for third-party authentication.
- User data management.
- Firebase integration for authentication.

### Service Management Service
- Service listing creation and management.
- Admin approval workflow.
- Category and tag management.
- Service data storage and retrieval.

### Search & Discovery Service
- Advanced search capabilities.
- Filtering and sorting algorithms.

### Booking Service
- Availability management.
- Appointment scheduling.
- Notification system for booking updates.
- Booking history and management.

### Payment Service
- Integration with Stripe.
- Transaction processing and verification.
- Payment history and receipts.
- Refund processing.

### Communication Service
- WebSocket implementation for real-time chat.
- WebRTC integration for video calling.
- Message storage and retrieval.
- File sharing capabilities.
- Firebase real-time database for messaging.

### API Gateway
- Request routing to appropriate microservices.
- Authentication middleware.
- Rate limiting.
- Request/response transformation.

---

## 📤 Deployment Strategy
- Containerized deployment using Docker.
- Orchestration through Kubernetes.
- Horizontal scaling based on load.
- CI/CD pipeline for automated testing and deployment.

---

## 🔨 In-Progress Development Tasks

### 1. Real-time Messaging System
- Implementing WebSocket for instant message delivery.
- Building message persistence and history functionality.
- Developing typing indicators and read receipts.
- Creating notification system for new messages.

### 2. Video and Audio Calling Features
- Implementing WebRTC for peer-to-peer communication.
- Building video calling interface with screen sharing capabilities.
- Developing audio-only calling option for low-bandwidth situations.
- Creating call quality optimization algorithms.
- Implementing recording capabilities for service sessions.

---

## 👤 User Stories

**Background:**
Sarah is a 28-year-old marketing professional living in a bustling city. She has a busy schedule and needs quick access to services like laptop repair and yoga classes.

**How Urban Assist Helps Sarah:**
- **Unified Service Discovery**: One-stop platform to find and book services.
- **Trustworthy Listings**: Verified providers with ratings and reviews.
- **Easy Booking**: Real-time availability and instant confirmations.
- **Secure Payments**: Multiple payment options with transaction security.
