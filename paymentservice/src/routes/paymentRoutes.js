const express = require('express');
const PaymentController = require('../controllers/paymentController');

const router = express.Router();

router.post('/card-pay', PaymentController.handleCardPayment);

module.exports = router;