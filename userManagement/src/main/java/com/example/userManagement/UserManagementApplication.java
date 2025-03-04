package com.example.userManagement;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@SpringBootApplication
public class UserManagementApplication {

    private static final Logger logger = LoggerFactory.getLogger(UserManagementApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(UserManagementApplication.class, args);
    }

    @Component
    class StartupLogger {
        private final Environment environment;

        StartupLogger(Environment environment) {
            this.environment = environment;
        }

        @EventListener(ApplicationStartedEvent.class)
        public void logStartup() {
            String port = environment.getProperty("server.port");
            logger.info("==========================================================");
            logger.info("User Profile Service is running on port: {}", port);
            logger.info("Access the API at: http://localhost:{}/api/profile", port);
            logger.info("==========================================================");
        }
    }
}