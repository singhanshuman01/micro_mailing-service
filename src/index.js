const express = require('express');
const logger = require('./middleware/logger');
const bodyParser = require('body-parser');
require('dotenv').config();

const submit = require('./routes/submit');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);
app.use(express.static('public/'));

app.use('/submit', submit);
app.use('/health', (req, res) => {
    res.send("Everything fine");
});
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

module.exports = app;