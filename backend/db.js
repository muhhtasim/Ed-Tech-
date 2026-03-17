const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',      
  password: '',      
  database: 'ed-tech_db' // <--- Ekhane database er exact nam ta likhun
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to the MySQL database! 🚀');
});

module.exports = connection;