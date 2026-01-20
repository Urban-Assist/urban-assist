-- =============================================
-- Create MySQL User for Urban Assist Application
-- =============================================
-- Run this script to create the urbanassist user with proper permissions

-- Create user if doesn't exist (for both localhost and any host)
CREATE USER IF NOT EXISTS 'urbanassist'@'localhost' IDENTIFIED BY 'UrbanAssist@2024!';
CREATE USER IF NOT EXISTS 'urbanassist'@'%' IDENTIFIED BY 'UrbanAssist@2024!';

-- Grant all privileges on demo database
GRANT ALL PRIVILEGES ON demo.* TO 'urbanassist'@'localhost';
GRANT ALL PRIVILEGES ON demo.* TO 'urbanassist'@'%';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;

-- Verify the user was created
SELECT User, Host FROM mysql.user WHERE User = 'urbanassist';

SELECT 'User urbanassist created successfully with access to demo database!' AS Status;
