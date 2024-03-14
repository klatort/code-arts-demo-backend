const express = require('express');
require('dotenv').config();
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.get('/data', async (req, res) => {
    const result = await pool.query('SELECT * FROM your_table');
    res.json(result.rows);
});

app.listen(3000, () => console.log('Server running on port 3000'));