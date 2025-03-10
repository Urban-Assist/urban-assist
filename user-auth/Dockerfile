# Build stage
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM openjdk:17-slim
WORKDIR /app


# Copy the built jar from build stage
COPY --from=build /app/target/*.jar /app/app.jar



# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]