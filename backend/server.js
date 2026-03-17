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

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});