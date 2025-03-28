require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/paymentRoutes');
const Stripe = require("stripe");
 
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
app.use('/payments', paymentRoutes);

module.exports = app;
