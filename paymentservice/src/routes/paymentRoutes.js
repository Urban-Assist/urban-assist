const express = require('express');
const PaymentController = require('../controllers/paymentController');
const {authenticateJWT, authorizeRole} = require('../middleware/verify');
const router = express.Router();

// router.post('/card-pay', authenticateJWT,(req,res)=>{
//     console.log(req.body);  
    
//     return res.status(200).json({message:"Payment successful"});
// });
router.post('/card-pay', authenticateJWT, PaymentController.processCardPayment);
router.post('/create-customer', PaymentController.createUserAccount);

// Route to fetch payments by email
router.get('/payments/:email', authenticateJWT, PaymentController.fetchPaymentsByEmail);

// Add this new route
router.get('/receipt/:paymentId', authenticateJWT, PaymentController.getPaymentReceipt);

//route to list transactions of the particular user
//transactions of the particular provider dashboard with total earnings
module.exports = router;