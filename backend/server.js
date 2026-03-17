const express = require('express');
const mysql = require('./db'); // Amader age toiri kora db.js file
const cors = require('cors');

const app = express();
app.use(express.json()); // JSON data receive korar jonno
app.use(cors()); // Frontend access allow korar jonno

// Registration Route (Create User) 
app.post('/register', (req, res) => {
    const { full_name, email, password, university } = req.body;

    const sql = "INSERT INTO users (full_name, email, password, university) VALUES (?, ?, ?, ?)";
    
    mysql.query(sql, [full_name, email, password, university], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Registration failed! Maybe email already exists." });
        }
        res.status(201).json({ message: "User registered successfully!", userId: result.insertId });
    });
});

// Login Route (Read User & Validate)
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists in the database [cite: 31]
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    
    mysql.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error" });
        }

        if (results.length > 0) {
            // User found and password matches
            const user = results[0];
            res.status(200).json({ 
                message: "Login successful! Welcome back.", 
                user: {
                    id: user.user_id,
                    name: user.full_name,
                    role: user.role
                } 
            });
        } else {
            // No user found with those credentials
            res.status(401).json({ message: "Invalid email or password!" });
        }
    });
});

// Create Course Route (Admin/Instructor can create posts)
app.post('/courses', (req, res) => {
    const { title, description, price, category, instructor_id } = req.body;

    const sql = "INSERT INTO courses (title, description, price, category, instructor_id) VALUES (?, ?, ?, ?, ?)";
    
    mysql.query(sql, [title, description, price, category, instructor_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to create course." });
        }
        res.status(201).json({ message: "Course created successfully!", courseId: result.insertId });
    });
});

// Get All Courses with Search, Filter, and Sort functionality
app.get('/courses', (req, res) => {
    let { search, minPrice, maxPrice, orderBy, orderDir } = req.query;
    
    // Base SQL query
    let sql = "SELECT * FROM courses WHERE 1=1";
    let queryParams = [];

    // 1. Search by Title
    if (search) {
        sql += " AND title LIKE ?";
        queryParams.push(`%${search}%`);
    }

    // 2. Filter by Price Range
    if (minPrice) {
        sql += " AND price >= ?";
        queryParams.push(minPrice);
    }
    if (maxPrice) {
        sql += " AND price <= ?";
        queryParams.push(maxPrice);
    }

    // 3. Order by (Default name sorting)
    let validColumns = ['title', 'price', 'created_at'];
    let sortColumn = validColumns.includes(orderBy) ? orderBy : 'title';
    let sortDir = (orderDir === 'DESC') ? 'DESC' : 'ASC';

    sql += ` ORDER BY ${sortColumn} ${sortDir}`;

    mysql.query(sql, queryParams, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error fetching courses" });
        }
        res.status(200).json(results);
    });
});

// Update User Information
app.put('/update-user/:id', (req, res) => {
    const { full_name, university } = req.body;
    const userId = req.params.id;

    const sql = "UPDATE users SET full_name = ?, university = ? WHERE user_id = ?";
    
    mysql.query(sql, [full_name, university, userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Update failed!" });
        }
        res.status(200).json({ message: "Profile updated successfully!" });
    });
});

// Delete a course
// backend/server.js ফাইলে গিয়ে এই অংশটুকু খুঁজুন বা যোগ করুন
app.delete('/delete-course/:id', (req, res) => {
    const courseId = req.params.id;
    const sql = "DELETE FROM courses WHERE course_id = ?";

    mysql.query(sql, [courseId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error" });
        }
        res.status(200).json({ message: "Deleted successfully" });
    });
});

// Add a new course
app.post('/add-course', (req, res) => {
    const { title, price, category } = req.body;
    const sql = "INSERT INTO courses (title, price, category) VALUES (?, ?, ?)";

    mysql.query(sql, [title, price, category], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error adding course" });
        }
        res.status(200).json({ message: "Course added successfully!" });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});