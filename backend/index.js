const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'tracker'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

app.get('/today-expenditure', (req, res) => {
    const today = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
    const sql = `SELECT date, SUM(price) AS money_spent FROM tracker WHERE date = '${today}';`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.get('/travel', (req, res) => {
    const today = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
    const sql = `SELECT category, SUM(price) AS Travel_expense, date FROM tracker WHERE category="Travel" AND date = '${today}';`;
    db.query(sql, (err, results) => {
        if(err) return res.status(500).send(err);
        res.json(results);
    });
});

app.get('/entertainment', (req, res) => {
    const today = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
    const sql = `SELECT category, SUM(price) AS Entertainment_expense, date FROM tracker WHERE category="Entertainment" AND date = '${today}';`;
    db.query(sql, (err, results) => {
        if(err) return res.status(500).send(err);
        res.json(results);
    });
});

app.get('/food', (req, res) => {
    const today = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
    const sql = `SELECT category, SUM(price) AS Food_expense, date FROM tracker WHERE category="Food" AND date = '${today}';`;
    db.query(sql, (err, results) => {
        if(err) return res.status(500).send(err);
        res.json(results);
    });
});

app.get('/shopping', (req, res) => {
    const today = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
    const sql = `SELECT category, SUM(price) AS Shopping_expense, date FROM tracker WHERE category="Shopping" AND date = '${today}';`;
    db.query(sql, (err, results) => {
        if(err) return res.status(500).send(err);
        res.json(results);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export the app for testing purposes
