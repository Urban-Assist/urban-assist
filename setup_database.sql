-- =============================================
-- Urban Assist - Complete Database Setup Script
-- =============================================
-- This script creates all required tables for the Urban Assist application
-- Run this on the 'demo' database

USE demo;

-- =============================================
-- 1. USER TABLE (Authentication Service)
-- =============================================
CREATE TABLE IF NOT EXISTS user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    varified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 2. EMAIL CONFIRMATION TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS email_confirmation (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(255) UNIQUE NOT NULL,
    user_id BIGINT NOT NULL,
    expiry_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_token (token),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 3. PASSWORD RESET TOKEN TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS password_reset_token (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(255) UNIQUE NOT NULL,
    user_id BIGINT NOT NULL,
    expiry_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_token (token),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 4. USER PROFILE TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS user_profile (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone_number VARCHAR(20),
    address VARCHAR(500),
    profile_pic VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 5. PROVIDER PROFILE TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS provider_profile (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    linkedin VARCHAR(255),
    description TEXT,
    service VARCHAR(100),
    price VARCHAR(50),
    stars INT DEFAULT 0,
    address VARCHAR(500),
    profile_pic VARCHAR(500),
    certified BOOLEAN DEFAULT FALSE,
    certification_number VARCHAR(100),
    experience INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_service (service)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 6. PROVIDER WORK IMAGES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS provider_profile_work_images (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    provider_profile_id BIGINT NOT NULL,
    work_images VARCHAR(500),
    FOREIGN KEY (provider_profile_id) REFERENCES provider_profile(id) ON DELETE CASCADE,
    INDEX idx_provider_id (provider_profile_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 7. PROVIDER TESTIMONIALS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS provider_profile_testimonials (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    provider_profile_id BIGINT NOT NULL,
    testimonials TEXT,
    FOREIGN KEY (provider_profile_id) REFERENCES provider_profile(id) ON DELETE CASCADE,
    INDEX idx_provider_id (provider_profile_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 8. SERVICES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS Services (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(100) NOT NULL,
    service_slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon_class VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_slug (service_slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 9. BOOKINGS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    provider_email VARCHAR(255) NOT NULL,
    service_type VARCHAR(100) NOT NULL,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    notes TEXT,
    provider_name VARCHAR(200),
    user_name VARCHAR(200),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_email (user_email),
    INDEX idx_provider_email (provider_email),
    INDEX idx_booking_date (booking_date),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 10. AVAILABILITIES TABLE (for provider schedules)
-- =============================================
CREATE TABLE IF NOT EXISTS availabilities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    provider_email VARCHAR(255) NOT NULL,
    available_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_booked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_provider_email (provider_email),
    INDEX idx_date (available_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 11. PAYMENTS TABLE (Payment Service)
-- =============================================
CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    payment_status VARCHAR(50) NOT NULL,
    stripe_payment_id VARCHAR(255),
    booking_id BIGINT,
    user_email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_booking_id (booking_id),
    INDEX idx_user_email (user_email),
    INDEX idx_stripe_payment_id (stripe_payment_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Insert Default Services
-- =============================================
INSERT INTO Services (service_name, service_slug, description, icon_class) VALUES
('Restoration', 'restoration', 'Bringing life back to your spaces with expert restoration services.', 'FaRecycle'),
('House Cleaning', 'house-cleaning', 'Sparkling clean homes with our professional cleaning services.', 'FaBroom'),
('Plumbing', 'plumbing', 'Fixing leaks and ensuring smooth water flow in your home.', 'FaWrench'),
('Electrician', 'electrician', 'Reliable electrical solutions for your safety and convenience.', 'FaBolt'),
('Repairs', 'repairs', 'Quick and efficient repair services to keep things running.', 'FaTools'),
('Painting', 'painting', 'Transform your spaces with professional painting services.', 'FaPaintBrush')
ON DUPLICATE KEY UPDATE service_name=VALUES(service_name);

-- =============================================
-- Display Table Summary
-- =============================================
SELECT 'Database setup completed successfully!' AS Status;
SHOW TABLES;
