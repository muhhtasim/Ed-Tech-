const express = require('express');
const mysql = require('./db'); 
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_prod';
const JWT_EXPIRES_IN = '7d';

function generateToken(user) {
    const payload = { id: user.user_id, role: user.role, email: user.email, name: user.full_name };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function authenticateToken(req, res, next) {
    const auth = req.headers['authorization'];
    if (!auth) return res.status(401).json({ message: 'Missing Authorization header' });
    const parts = auth.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Invalid Authorization header' });
    const token = parts[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

const app = express();

// Middleware
app.use(express.json()); 
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5174', credentials: true })); 

// --- ১. Registration Route (Updated with University) ---
app.post('/register', async (req, res) => {
    const { name, email, password, role, university } = req.body; 

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email and password are required.' });
    }

    try {
        // Check if email already exists
        const [existing] = await mysql.promise().query('SELECT user_id FROM users WHERE email = ?', [email]);
        if (existing && existing.length > 0) {
            return res.status(409).json({ message: 'Email already registered.' });
        }

        const hashed = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO users (full_name, email, password, role, university) VALUES (?, ?, ?, ?, ?)";
        const [result] = await mysql.promise().query(sql, [name, email, hashed, role || 'student', university]);
        const insertId = result.insertId;
        const [rows] = await mysql.promise().query('SELECT * FROM users WHERE user_id = ?', [insertId]);
        const newUser = rows[0];
        const token = generateToken(newUser);
        // create refresh token and set httpOnly cookie
        const refreshToken = jwt.sign({ id: newUser.user_id }, JWT_SECRET, { expiresIn: '30d' });
        try {
            await mysql.promise().query('UPDATE users SET refresh_token = ? WHERE user_id = ?', [refreshToken, newUser.user_id]);
            const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 30 * 24 * 60 * 60 * 1000 };
            res.cookie('refreshToken', refreshToken, cookieOptions);
        } catch (e) {
            console.error('Failed to store refresh token on register:', e.message || e);
        }

        console.log('✅ User registered:', email);
        return res.status(201).json({ message: 'Account created successfully.', token, user: { id: newUser.user_id, name: newUser.full_name, email: newUser.email, role: newUser.role, university: newUser.university } });
    } catch (err) {
        console.error('Registration DB Error:', err.message || err);
        return res.status(500).json({ message: 'Registration failed.' });
    }
});

// --- ২. Login Route ---
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required.' });

    try {
        const [rows] = await mysql.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        if (!rows || rows.length === 0) return res.status(401).json({ message: 'Invalid credentials.' });

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials.' });

        const token = generateToken(user);
        const refreshToken = jwt.sign({ id: user.user_id }, JWT_SECRET, { expiresIn: '30d' });
        try {
            await mysql.promise().query('UPDATE users SET refresh_token = ? WHERE user_id = ?', [refreshToken, user.user_id]);
            const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 30 * 24 * 60 * 60 * 1000 };
            res.cookie('refreshToken', refreshToken, cookieOptions);
        } catch (e) {
            console.error('Failed to store refresh token:', e.message || e);
        }
        return res.status(200).json({ 
            message: 'Login successful.',
            token,
            user: {
                id: user.user_id,
                name: user.full_name,
                email: user.email,
                role: user.role,
                university: user.university
            }
        });
    } catch (err) {
        console.error('Login Error:', err.message || err);
        return res.status(500).json({ message: 'Server error.' });
    }
});

// Refresh token endpoint
app.post('/refresh-token', async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return res.status(400).json({ message: 'refreshToken cookie required' });
    try {
        const decoded = jwt.verify(refreshToken, JWT_SECRET);
        const [rows] = await mysql.promise().query('SELECT refresh_token FROM users WHERE user_id = ?', [decoded.id]);
        if (!rows || rows.length === 0) return res.status(401).json({ message: 'Invalid refresh token' });
        const stored = rows[0].refresh_token;
        if (!stored || stored !== refreshToken) return res.status(401).json({ message: 'Invalid refresh token' });
        const [userRows] = await mysql.promise().query('SELECT * FROM users WHERE user_id = ?', [decoded.id]);
        const user = userRows[0];
        const token = generateToken(user);

        // rotate refresh token: issue new refresh token and store it
        const newRefreshToken = jwt.sign({ id: user.user_id }, JWT_SECRET, { expiresIn: '30d' });
        try {
            await mysql.promise().query('UPDATE users SET refresh_token = ? WHERE user_id = ?', [newRefreshToken, user.user_id]);
            const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 30 * 24 * 60 * 60 * 1000 };
            res.cookie('refreshToken', newRefreshToken, cookieOptions);
        } catch (e) {
            console.error('Failed to rotate refresh token:', e.message || e);
        }

        return res.json({ token });
    } catch (err) {
        console.error('Refresh token error:', err.message || err);
        return res.status(401).json({ message: 'Invalid or expired refresh token' });
    }
});

// Logout endpoint
app.post('/logout', authenticateToken, async (req, res) => {
    try {
        await mysql.promise().query('UPDATE users SET refresh_token = NULL WHERE user_id = ?', [req.user.id]);
        res.clearCookie('refreshToken');
        return res.json({ message: 'Logged out' });
    } catch (err) {
        console.error('Logout error:', err.message || err);
        return res.status(500).json({ message: 'Logout failed' });
    }
});

// --- ৩. Enrollment Route ---
app.post('/enroll', (req, res) => {
    const { user_id, course_id } = req.body;
    const uid = req.user?.id || user_id;
    if (!uid || !course_id) return res.status(400).json({ message: 'user_id and course_id are required.' });
    const sql = "INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)";

    mysql.query(sql, [uid, course_id], (err, result) => {
        if (err) {
            console.error('Enrollment Error:', err.message || err);
            return res.status(500).json({ message: 'Enrollment failed!' });
        }
        res.status(201).json({ message: 'Enrolled successfully!' });
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
        if (err) {
            console.error('Get course error:', err.message || err);
            return res.status(500).json({ message: 'Error fetching course' });
        }
        if (!data || data.length === 0) return res.status(404).json({ message: 'Course not found' });
        return res.json(data[0]);
    });
});

// --- ৭. Add New Course ---
app.post('/add-course', authenticateToken, (req, res) => {
    const { title, price, category, description } = req.body;
    if (!title) return res.status(400).json({ message: 'Course title is required.' });
    const parsedPrice = parseFloat(price) || 0;
    const sql = "INSERT INTO courses (title, price, category, description) VALUES (?, ?, ?, ?)";
    mysql.query(sql, [title, parsedPrice, category, description], (err, result) => {
        if (err) {
            console.error('Add course error:', err.message || err);
            return res.status(500).json({ message: "Error adding course" });
        }
        res.status(201).json({ message: "Course added successfully!" });
    });
});

// --- ৮. Delete Course ---
app.delete('/delete-course/:id', authenticateToken, (req, res) => {
    const courseId = req.params.id;
    if (!courseId) return res.status(400).json({ message: 'Course id required' });
    // only admins can delete courses
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const sql = "DELETE FROM courses WHERE course_id = ?";
    mysql.query(sql, [courseId], (err, result) => {
        if (err) {
            console.error('Delete course error:', err.message || err);
            return res.status(500).json({ message: 'Database error' });
        }
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json({ message: 'Deleted successfully' });
    });
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});