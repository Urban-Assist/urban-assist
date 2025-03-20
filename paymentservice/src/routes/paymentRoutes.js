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

//route to list transactions of the particular user
//transactions of the particular provider dashboard with total earnings
module.exports = router;