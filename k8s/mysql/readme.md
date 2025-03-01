# MySQL Database Deployment Guide

This guide explains how to set up a MySQL database container in Kubernetes.

## Prerequisites

- Minikube installed
- kubectl CLI tool
- Docker running

## Installation Steps

1. Start Minikube for local development:
```bash
minikube start
```

2. Apply Kubernetes configurations in the following order:
```bash
# Create storage class
kubectl apply -f storage-class.yaml

# Create persistent volume claim
kubectl apply -f pvc.yaml

# Deploy MySQL database
kubectl apply -f mysql-deployment.yaml

# Create MySQL service
kubectl apply -f mysql-svc.yaml
```

## Accessing the Database Locally

1. View the service details:
```bash
kubectl get svc
```

2. Set up port forwarding to access MySQL from your local machine:
```bash
kubectl port-forward svc/<service-name> <local-port>:3306
```

Example:
```bash
kubectl port-forward svc/mysql-service 3306:3306
```

## Database Connection Details

- Host: `localhost` (when using port-forward)
- Port: 3306
- Username: admin
- Password: admin
- Database: demo

## Troubleshooting

To check the status of your pods:
```bash
kubectl get pods
```

To view pod logs:
```bash
kubectl logs <pod-name>
```

## Cleaning Up

To delete all resources:
```bash
kubectl delete -f mysql-svc.yaml
kubectl delete -f mysql-deployment.yaml
kubectl delete -f pvc.yaml
kubectl delete -f storage-class.yaml
```

