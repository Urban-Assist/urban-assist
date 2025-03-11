const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const serviceRoutes = require('./routes/addServiceRoutes');

dotenv.config();

const app = express();
app.use(express.json());

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.use('/admin', serviceRoutes);

module.exports = app;
