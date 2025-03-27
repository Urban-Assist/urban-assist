# auth-service/Dockerfile
FROM eclipse-temurin:17-jdk-jammy
# FROM eclipse-temurin:17-jdk-slim
WORKDIR /app
COPY target/user-auth-*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]