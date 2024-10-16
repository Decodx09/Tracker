CREATE DATABASE IF NOT EXISTS tracker;

CREATE TABLE IF NOT EXISTS tracker (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL,
    INDEX idx_category (category)
);

INSERT INTO tracker (category, price, date) VALUES
('Shopping', ROUND(RAND() * 100, 2), CURDATE()),
('Travel', ROUND(RAND() * 200, 2), CURDATE()),
('Shopping', ROUND(RAND() * 100, 2), CURDATE()),
('Travel', ROUND(RAND() * 200, 2), CURDATE()),
('Shopping', ROUND(RAND() * 100, 2), CURDATE()),
('Travel', ROUND(RAND() * 200, 2), CURDATE()),
('Shopping', ROUND(RAND() * 100, 2), CURDATE()),
('Travel', ROUND(RAND() * 200, 2), CURDATE()),
('Shopping', ROUND(RAND() * 100, 2), CURDATE()),
('Travel', ROUND(RAND() * 200, 2), CURDATE()),
('Shopping', ROUND(RAND() * 100, 2), CURDATE()),
('Travel', ROUND(RAND() * 200, 2), CURDATE()),
('Shopping', ROUND(RAND() * 100, 2), CURDATE()),
('Travel', ROUND(RAND() * 200, 2), CURDATE()),
('Shopping', ROUND(RAND() * 100, 2), CURDATE()),
('Travel', ROUND(RAND() * 200, 2), CURDATE()),
('Shopping', ROUND(RAND() * 100, 2), CURDATE()),
('Travel', ROUND(RAND() * 200, 2), CURDATE()),
('Shopping', ROUND(RAND() * 100, 2), CURDATE()),
('Travel', ROUND(RAND() * 200, 2), CURDATE()),
('Entertainment', ROUND(RAND() * 100, 2), CURDATE()),
('Food', ROUND(RAND() * 200, 2), CURDATE()),
('Entertainment', ROUND(RAND() * 100, 2), CURDATE()),
('Food', ROUND(RAND() * 200, 2), CURDATE()),
('Entertainment', ROUND(RAND() * 100, 2), CURDATE()),
('Food', ROUND(RAND() * 200, 2), CURDATE()),
('Entertainment', ROUND(RAND() * 100, 2), CURDATE()),
('Food', ROUND(RAND() * 200, 2), CURDATE()),
('Entertainment', ROUND(RAND() * 100, 2), CURDATE()),
('Food', ROUND(RAND() * 200, 2), CURDATE()),
('Entertainment', ROUND(RAND() * 100, 2), CURDATE()),
('Food', ROUND(RAND() * 200, 2), CURDATE()),
('Entertainment', ROUND(RAND() * 100, 2), CURDATE()),
('Food', ROUND(RAND() * 200, 2), CURDATE()),
('Entertainment', ROUND(RAND() * 100, 2), CURDATE()),
('Food', ROUND(RAND() * 200, 2), CURDATE()),
('Entertainment', ROUND(RAND() * 100, 2), CURDATE()),
('Food', ROUND(RAND() * 200, 2), CURDATE()),
('Entertainment', ROUND(RAND() * 100, 2), CURDATE()),
('Food', ROUND(RAND() * 200, 2), CURDATE());

USE tracker;

CREATE USER 'root'@'%' IDENTIFIED BY 'root';

GRANT ALL PRIVILEGES ON tracker.* TO 'shivansh'@'%';
FLUSH PRIVILEGES;
