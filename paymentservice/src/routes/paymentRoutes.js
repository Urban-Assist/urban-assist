const express = require('express');
const PaymentController = require('../controllers/paymentController');
const {authenticateJWT} = require('../middleware/verify');
 const router = express.Router();

router.post('/card-pay', authenticateJWT,(req,res)=>{
    console.log(req.body);
    console.log(req.user);
    return res.status(200).json({message:"Payment successful"});
});
router.post('/create-customer', PaymentController.createUserAccount);
module.exports = router;