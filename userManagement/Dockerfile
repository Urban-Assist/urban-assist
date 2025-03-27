# Use official OpenJDK 17 base image
FROM eclipse-temurin:17-jdk-jammy
# Set working directory
WORKDIR /app
# Copy the built JAR file (change this to match your JAR name)
COPY target/user-profile-service-*.jar app.jar
# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]