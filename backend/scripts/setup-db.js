const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function run() {
  const sqlPath = path.resolve(__dirname, '..', '..', 'schema.sql');
  if (!fs.existsSync(sqlPath)) {
    console.error('schema.sql not found at', sqlPath);
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlPath, 'utf8');

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    multipleStatements: true
  });

  try {
    console.log('Running schema.sql...');
    await connection.query(sql);
  } catch (err) {
    const msg = (err.message || '').toLowerCase();
    if (msg.includes('database') && msg.includes('exists')) {
      console.log('Database already exists — continuing');
    } else {
      console.error('Failed to apply schema (fatal):', err.message || err);
      await connection.end();
      process.exit(1);
    }
  }

  // ensure refresh_token column exists for users (connect to target DB)
  try {
    const dbName = process.env.DB_NAME || 'edtech';
    const dbConn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: dbName
    });
    await dbConn.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS refresh_token VARCHAR(512)");
    console.log('Ensured users.refresh_token column exists.');
    await dbConn.end();
  } catch (e) {
    console.log('Could not ensure refresh_token column:', e.message || e);
  }

  console.log('Database schema applied/confirmed successfully.');
  await connection.end();
  process.exit(0);
}

run();
