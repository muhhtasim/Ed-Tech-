const express = require('express');
const mysql = require('./db'); 
const cors = require('cors');

const app = express();
app.use(express.json()); 
app.use(cors()); 

// --- ১. Registration Route ---
app.post('/register', (req, res) => {
    const { name, email, password, role } = req.body; 
    const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    
    mysql.query(sql, [name, email, password, role], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Registration failed!" });
        }
        res.status(200).json({ message: "Account created successfully!" });
    });
});

// --- ২. Login Route ---
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    
    mysql.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error" });
        }
        if (results.length > 0) {
            const user = results[0];
            res.status(200).json({ 
                message: "Login successful!", 
                user: {
                    id: user.user_id,
                    name: user.name || user.full_name, // আপনার ডাটাবেজের কলাম অনুযায়ী
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

// --- ৩. Enrollment Route (কোর্স কেনা) ---
// পেমেন্ট সফল হওয়ার পর এই রুট কল হবে
app.post('/enroll', (req, res) => {
    const { user_id, course_id } = req.body;
    const sql = "INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)";

    mysql.query(sql, [user_id, course_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Enrollment failed!" });
        }
        res.status(200).json({ message: "Enrolled successfully!" });
    });
});

// --- ৪. Get User's Enrolled Courses (ড্যাশবোর্ডের জন্য) ---
app.get('/my-courses/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = `
        SELECT courses.* FROM courses 
        JOIN enrollments ON courses.course_id = enrollments.course_id 
        WHERE enrollments.user_id = ?`;

    mysql.query(sql, [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error fetching your courses" });
        }
        res.status(200).json(results);
    });
});

// --- ৫. Get All Courses (With Filter Support) ---
app.get('/courses', (req, res) => {
    let { search, userId } = req.query; // userId পাঠানো হলে কেনা কোর্স বাদ দিবে
    
    let sql = "SELECT * FROM courses";
    let queryParams = [];

    // যদি ইউজার লগইন থাকে, তবে তার কেনা কোর্সগুলো বাদ দেওয়ার লজিক
    if (userId) {
        sql = `SELECT * FROM courses WHERE course_id NOT IN 
               (SELECT course_id FROM enrollments WHERE user_id = ?)`;
        queryParams.push(userId);
    }

    mysql.query(sql, queryParams, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error fetching courses" });
        }
        res.status(200).json(results);
    });
});

// --- ৬. Single Course & Course Management ---
app.get('/course/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM courses WHERE course_id = ?";
    mysql.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data[0]);
    });
});

app.post('/add-course', (req, res) => {
    const { title, price, category } = req.body;
    const sql = "INSERT INTO courses (title, price, category) VALUES (?, ?, ?)";
    mysql.query(sql, [title, price, category], (err, result) => {
        if (err) return res.status(500).json({ message: "Error adding course" });
        res.status(200).json({ message: "Course added successfully!" });
    });
});

app.delete('/delete-course/:id', (req, res) => {
    const courseId = req.params.id;
    const sql = "DELETE FROM courses WHERE course_id = ?";
    mysql.query(sql, [courseId], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.status(200).json({ message: "Deleted successfully" });
    });
});

// --- ৭. Update User ---
app.put('/update-user/:id', (req, res) => {
    const { full_name, university } = req.body;
    const userId = req.params.id;
    const sql = "UPDATE users SET name = ?, university = ? WHERE user_id = ?";
    mysql.query(sql, [full_name, university, userId], (err, result) => {
        if (err) return res.status(500).json({ message: "Update failed!" });
        res.status(200).json({ message: "Profile updated successfully!" });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});