const express = require('express');
const PaymentController = require('../controllers/paymentController');
 const router = express.Router();

router.post('/card-pay', PaymentController.handleCardPayment);
router.post('/create-customer', PaymentController.createUserAccount);
module.exports = router;