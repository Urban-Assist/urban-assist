const PaymentService = require('../services/paymentService');
const CreateCustomerService = require('../services/CreateStripeCustomer.js');
const { CustomerMapping } = require('../models/CustomerMapping.js');
const { Transactions } = require('../models/paymentModel.js');
const axios = require('axios');
 const PaymentController = {
    processCardPayment: async (req, res) => {
        //to information
        console.log(req.body.user?.provider?.id);
        console.log(req.body.user.provider?.firstName+" "+req.body.provider?.lastName);
        console.log(req.body.user.provider?.email);

        //from deatails
        console.log("---"+req.consumer.id)

        console.log(req.body.user?.provider?.price)

        // Create instance object with the logged values
        const instance = {
                to: req.body.user.provider?.email || null,
                name: req.body.user.provider?.firstName + " " + req.body.user.provider?.lastName || "Unknown User",
                providerName: req.body.user.provider?.firstName + " " + req.body.provider?.lastName || "Unknown Provider",
                from: req.consumer?.sub || null,          
                price: req.body.user?.provider?.price || "0"          
        };
        /*
        {
  "userEmail": "example@gmail.com",
  "userName": "John Doe",
  "providerEmail": "vaibhavpatel162002@gmail.com",
  "providerName": "Dr. Vaibhav Patel",
  "providerPhoneNumber": "+1234567890",
  "service": "restoration",
  "pricePaid": 99.99,
  "transactionId": "txn_12345678901234",
  "slotData": {
    "_id": "28",
    "date": "2025-03-20",
    "startTime": "10:00",
    "endTime": "11:00",
    "providerEmail": "vaibhavpatel162002@gmail.com",
    "service": "restoration",
    "originalStartTime": "2025-03-20T13:00:00Z",
    "originalEndTime": "2025-03-20T14:00:00Z"
  }
}*/

        console.log(req.body.user)
      const savedTransaction = await Transactions.create(instance);
        //now send the request to the booking.
        const bookingData = {
    
            "userEmail": req.consumer?.sub,
            "userName": "John Doe",
            "providerEmail": req.body.user.provider.email,
            "providerName": req.body.user.provider?.firstName + " " + req.body.user.provider?.lastName ,
            "providerPhoneNumber": req.body.user.provider.phoneNumber,
            "service": req.body.user.service,
            "pricePaid": req.body.user.provider.price,
            "transactionId": savedTransaction.id,
            "slotData": {
              "_id": "28",
              "date": req.body.user.slot.date,
              "startTime": req.body.user.slot.startTime,
              "endTime": req.body.user.slot.endTime,
              "providerEmail": req.body.user.provider.email,
              "service": req.body.user.service,
              "originalStartTime": "2025-03-20T13:00:00Z",
              "originalEndTime": "2025-03-20T14:00:00Z"
            }
          
    }
    
   
    const bookingResponse = await axios.post(process.env.SERVER_URL+"/api/booking/success", bookingData,{
        headers: {
            "Authorization": req.headers.authorization,
            "Content-Type": "application/json"
        }
    });

     return res.status(200).json({message:"Payment successful and slot booked "+ savedTransaction+"Booking Response "+ bookingResponse.data});
    },
        
    handleCardPayment: async (req, res) => {
        try {
            const { amount, currency, paymentMethodId } = req.body;
            if (!amount || !currency || !paymentMethodId) {
                return res.status(400).json({ error: 'Amount, currency, and paymentMethodId are required' });
            }

            const response = await PaymentService.processCardPayment(amount, currency, paymentMethodId);
            res.json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createUserAccount : async (req, res) => {
        const { email, userID, name } = req.body;
      
        try {
          
      
          const newCustomer = await CreateCustomerService.processCustomerCreation(email, userID, name);
          res.status(201).json({ message: "User account created successfully", data: newCustomer });
        } catch (error) {
          res.status(500).json({ message: "Error creating user account", error: error.message });
        }
      
},
};

 
module.exports = PaymentController;