require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306
};

let db = null;
const requiredVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missingEnv = requiredVars.filter((key) => !process.env[key]);

if (missingEnv.length) {
  console.error(`Missing environment variables: ${missingEnv.join(', ')}`);
  console.error('Database connection will not be established until these credentials are provided.');
} else {
  db = mysql.createConnection(dbConfig);
  db.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err);
      db = null;
    } else {
      console.log('Connected to database');
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS students (
          id INT AUTO_INCREMENT PRIMARY KEY,
          student_id VARCHAR(50) NOT NULL UNIQUE,
          full_name VARCHAR(100) NOT NULL,
          course VARCHAR(100) NOT NULL,
          year_level INT NOT NULL,
          email VARCHAR(100) NOT NULL UNIQUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `;
      db.query(createTableQuery, (tableErr) => {
        if (tableErr) {
          console.error('Failed to create students table:', tableErr);
        } else {
          console.log('Students table is ready');
        }
      });
    }
  });
}

function ensureDb(res) {
  if (!db) {
    res.status(500).json({ error: 'Database is not configured. Set DB_HOST, DB_USER, DB_PASSWORD, DB_NAME.' });
    return false;
  }
  return true;
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

app.get('/list', (req, res) => {
  res.sendFile(path.join(__dirname, 'list.html'));
});

app.get('/edit/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'edit.html'));
});

// API Routes for CRUD
app.post('/api/students', (req, res) => {
  if (!ensureDb(res)) return;
  const { student_id, full_name, course, year_level, email } = req.body;
  const query = 'INSERT INTO students (student_id, full_name, course, year_level, email) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [student_id, full_name, course, year_level, email], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Student added successfully', id: result.insertId });
    }
  });
});

app.get('/api/students', (req, res) => {
  if (!ensureDb(res)) return;
  const query = 'SELECT * FROM students';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/students/:id', (req, res) => {
  if (!ensureDb(res)) return;
  const { id } = req.params;
  const query = 'SELECT * FROM students WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!results || results.length === 0) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(results[0]);
    }
  });
});

app.put('/api/students/:id', (req, res) => {
  if (!ensureDb(res)) return;
  const { id } = req.params;
  const { student_id, full_name, course, year_level, email } = req.body;
  const query = 'UPDATE students SET student_id = ?, full_name = ?, course = ?, year_level = ?, email = ? WHERE id = ?';
  db.query(query, [student_id, full_name, course, year_level, email, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Student updated successfully' });
    }
  });
});

app.delete('/api/students/:id', (req, res) => {
  if (!ensureDb(res)) return;
  const { id } = req.params;
  const query = 'DELETE FROM students WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Student deleted successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});