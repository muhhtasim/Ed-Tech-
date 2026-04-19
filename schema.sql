CREATE DATABASE edtech;
USE edtech;



CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    university VARCHAR(100),
    role ENUM('student', 'admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) DEFAULT 0.00,
    category VARCHAR(50),
    instructor_id INT,
    FOREIGN KEY (instructor_id) REFERENCES users(user_id)
);

CREATE TABLE guidelines (
    guide_id INT AUTO_INCREMENT PRIMARY KEY,
    topic_name VARCHAR(100) NOT NULL,
    resource_links TEXT,
    category VARCHAR(50)
);

CREATE TABLE enrollments (
    enroll_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    course_id INT,
    progress INT DEFAULT 0,
    status ENUM('active', 'completed') DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);