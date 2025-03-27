# Build stage
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM openjdk:17-slim
WORKDIR /app

# Set environment variables
# ENV DB_PASSWORD=vaibhav@admin
# ENV DB_USERNAME=root
# ENV AUTH_SERVER_PORT=9000
# ENV DB_URL=jdbc:mysql://host.docker.internal:3306/demo

# Copy the built jar from build stage
COPY --from=build /app/target/*.jar /app/app.jar

# Expose the port
EXPOSE ${AUTH_SERVER_PORT}

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]


# # auth-service/Dockerfile
# FROM eclipse-temurin:17-jdk-jammy
# # FROM eclipse-temurin:17-jdk-slim
# WORKDIR /app
# COPY target/user-auth-*.jar app.jar
# ENTRYPOINT ["java", "-jar", "app.jar"]