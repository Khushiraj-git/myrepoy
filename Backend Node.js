Backend (Node.js with Express)
npm init -y      // Install Dependencies
npm install express pg bcryptjs jsonwebtoken cors body-parser
// Create server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, 'your_jwt_secret', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } 
else {
    res.sendStatus(401);
  }
};

// User registration
app.post('/register', async (req, res) => {
  const { name, email, address, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query('INSERT INTO users (name, email, address, password) VALUES ($1, $2, $3, $4)', [name, email, address, hashedPassword]);
  res.sendStatus(201);
});

// User login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret');
    res.json({ token });
  } 
else {
    res.sendStatus(403);
  }
});

// Get stores
app.get('/stores', async (req, res) => {
  const result = await pool.query('SELECT * FROM stores');
  res.json(result.rows);
});

// Submit rating
app.post('/rate', authenticateJWT, async (req, res) => {
  const { storeId, rating } = req.body;
  await pool.query('INSERT INTO ratings (user_id, store_id, rating) VALUES ($1, $2, $3)', [req.user.id, storeId, rating]);
  res.sendStatus(201);
});

// Start server
app.listen(port, () => {
  console.log(Server running on http://localhost:${port});
});
