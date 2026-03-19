const express = require('express');
const mysql = require('./db'); 
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors()); 

// --- ১. Registration Route (Updated with University) ---
app.post('/register', (req, res) => {
    // ফ্রন্টএন্ড থেকে university সহ সব ডাটা রিসিভ করা হচ্ছে
    const { name, email, password, role, university } = req.body; 
    
    console.log("📥 Registration Attempt for:", email);

    // SQL কুয়েরিতে ৫টি কলাম উল্লেখ করা হয়েছে (full_name, email, password, role, university)
    const sql = "INSERT INTO users (full_name, email, password, role, university) VALUES (?, ?, ?, ?, ?)";
    
    // ভ্যালু হিসেবে university পাঠানো হচ্ছে
    mysql.query(sql, [name, email, password, role || 'student', university], (err, result) => {
        if (err) {
            console.error("❌ DB Error:", err.sqlMessage);
            // সরাসরি DB এরর মেসেজ পাঠানো হচ্ছে যাতে ডিবাগ করতে সুবিধা হয়
            return res.status(500).json({ 
                message: "Registration failed!", 
                error: err.sqlMessage 
            });
        }
        console.log("✅ User registered successfully in DB!");
        res.status(200).json({ message: "Account created successfully!" });
    });
});

// --- ২. Login Route ---
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    
    mysql.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error("❌ Login Error:", err);
            return res.status(500).json({ message: "Server error" });
        }

        if (results.length > 0) {
            const user = results[0];
            console.log("✅ Login successful for:", user.email);
            
            res.status(200).json({ 
                message: "Login successful!", 
                user: {
                    id: user.user_id,
                    name: user.full_name, 
                    email: user.email,
                    role: user.role,
                    university: user.university
                } 
            });
        } else {
            res.status(401).json({ message: "Invalid email or password!" });
        }
    });
});

// --- ৩. Enrollment Route ---
app.post('/enroll', (req, res) => {
    const { user_id, course_id } = req.body;
    const sql = "INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)";

    mysql.query(sql, [user_id, course_id], (err, result) => {
        if (err) {
            console.error("❌ Enrollment Error:", err);
            return res.status(500).json({ message: "Enrollment failed!" });
        }
        res.status(200).json({ message: "Enrolled successfully!" });
    });
});

// --- ৪. Get User's Enrolled Courses ---
app.get('/my-courses/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = `
        SELECT courses.* FROM courses 
        JOIN enrollments ON courses.course_id = enrollments.course_id 
        WHERE enrollments.user_id = ?`;

    mysql.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: "Error fetching courses" });
        res.status(200).json(results);
    });
});

// --- ৫. Get All Courses ---
app.get('/courses', (req, res) => {
    let { userId } = req.query; 
    let sql = "SELECT * FROM courses";
    let queryParams = [];

    if (userId) {
        sql = `SELECT * FROM courses WHERE course_id NOT IN 
               (SELECT course_id FROM enrollments WHERE user_id = ?)`;
        queryParams.push(userId);
    }

    mysql.query(sql, queryParams, (err, results) => {
        if (err) return res.status(500).json({ message: "Error fetching courses" });
        res.status(200).json(results);
    });
});

// --- ৬. Get Single Course Details ---
app.get('/course/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM courses WHERE course_id = ?";
    mysql.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data[0]);
    });
});

// --- ৭. Add New Course ---
app.post('/add-course', (req, res) => {
    const { title, price, category, description } = req.body;
    const sql = "INSERT INTO courses (title, price, category, description) VALUES (?, ?, ?, ?)";
    mysql.query(sql, [title, price, category, description], (err, result) => {
        if (err) return res.status(500).json({ message: "Error adding course" });
        res.status(200).json({ message: "Course added successfully!" });
    });
});

// --- ৮. Delete Course ---
app.delete('/delete-course/:id', (req, res) => {
    const courseId = req.params.id;
    const sql = "DELETE FROM courses WHERE course_id = ?";
    mysql.query(sql, [courseId], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.status(200).json({ message: "Deleted successfully" });
    });
});

// Server Listen
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});