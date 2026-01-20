-- Insert provider users
INSERT INTO user (first_name, last_name, email, password, role, varified, created_at, updated_at) VALUES
('John', 'Doe', 'john.doe@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'provider', 1, NOW(), NOW()),
('Jane', 'Smith', 'jane.smith@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'provider', 1, NOW(), NOW()),
('Mike', 'Johnson', 'mike.johnson@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'provider', 1, NOW(), NOW()),
('Robert', 'White', 'robert.white@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'provider', 1, NOW(), NOW()),
('Lisa', 'Green', 'lisa.green@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'provider', 1, NOW(), NOW()),
('Paul', 'Brown', 'paul.brown@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'provider', 1, NOW(), NOW()),
('Emily', 'Carter', 'emily.carter@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'provider', 1, NOW(), NOW());

-- Insert provider profiles
INSERT INTO provider_profile (first_name, last_name, email, phone_number, linkedin, description, service, price, stars, address, profile_pic, certified, certification_number, experience) VALUES
('John', 'Doe', 'john.doe@example.com', '+1234567890', 'https://linkedin.com/in/johndoe', 'Expert in home restoration with over 10 years of experience. Specializes in restoring homes after water and fire damage.', 'restoration', '$150/hr', 4, 'New York, NY', 'https://randomuser.me/api/portraits/men/1.jpg', 1, 'CERT12345', 10),
('Jane', 'Smith', 'jane.smith@example.com', '+1234567891', 'https://linkedin.com/in/janesmith', '20 years of experience in home restoration', 'restoration', '$180/hr', 5, 'Los Angeles, CA', 'https://randomuser.me/api/portraits/women/2.jpg', 1, 'CERT12346', 20),
('Mike', 'Johnson', 'mike.johnson@example.com', '+1234567892', 'https://linkedin.com/in/mikejohnson', 'Professional cleaner with 5 years experience', 'house-cleaning', '$100/hr', 5, 'Chicago, IL', 'https://randomuser.me/api/portraits/men/3.jpg', 1, 'CERT12347', 5),
('Robert', 'White', 'robert.white@example.com', '+1234567893', 'https://linkedin.com/in/robertwhite', 'Fixing leaks for over a decade', 'plumbing', '$120/hr', 5, 'Houston, TX', 'https://randomuser.me/api/portraits/men/4.jpg', 1, 'CERT12348', 10),
('Lisa', 'Green', 'lisa.green@example.com', '+1234567894', 'https://linkedin.com/in/lisagreen', 'Licensed electrician with great reviews', 'electrician', '$130/hr', 5, 'Miami, FL', 'https://randomuser.me/api/portraits/women/5.jpg', 1, 'CERT12349', 8),
('Paul', 'Brown', 'paul.brown@example.com', '+1234567895', 'https://linkedin.com/in/paulbrown', 'General repair specialist', 'repairs', '$140/hr', 5, 'Seattle, WA', 'https://randomuser.me/api/portraits/men/6.jpg', 1, 'CERT12350', 7),
('Emily', 'Carter', 'emily.carter@example.com', '+1234567896', 'https://linkedin.com/in/emilycarter', 'Certified mental health professional', 'mental-wellbeing', '$200/hr', 5, 'San Francisco, CA', 'https://randomuser.me/api/portraits/women/6.jpg', 1, 'CERT12351', 15);

-- Insert work images for John Doe
INSERT INTO provider_profile_work_images (provider_profile_id, work_images) VALUES
(1, 'https://picsum.photos/800/600?random=1'),
(1, 'https://picsum.photos/800/600?random=2'),
(1, 'https://picsum.photos/800/600?random=3'),
(1, 'https://picsum.photos/800/600?random=4'),
(1, 'https://picsum.photos/800/600?random=5');

-- Insert testimonials for John Doe
INSERT INTO provider_profile_testimonials (provider_profile_id, testimonials) VALUES
(1, 'Alice: John did an amazing job! Highly recommend!'),
(1, 'Bob: Professional and very skilled at what he does.');
