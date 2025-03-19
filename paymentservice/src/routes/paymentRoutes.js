const express = require('express');
const PaymentController = require('../controllers/paymentController');
const {authenticateJWT} = require('../middleware/verify');
 const router = express.Router();

router.post('/card-pay', authenticateJWT, PaymentController.transactionFromConsumer);
// router.post('/card-pay', authenticateJWT, 
//     (req,res)=>{
//         console.log(req.body.providerDetails?.provider?.id);
//         console.log(req.consumer.id)
//         console.log(req.body.card?.amount)
//         res.send("Payment done");
//     }
// );

router.post('/create-customer', PaymentController.createUserAccount);
module.exports = router;