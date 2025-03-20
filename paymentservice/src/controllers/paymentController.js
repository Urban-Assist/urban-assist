const PaymentService = require('../services/paymentService');
const CreateCustomerService = require('../services/CreateStripeCustomer.js');
const { CustomerMapping } = require('../models/CustomerMapping.js');
const { Transactions, StripePayment } = require('../models/paymentModel.js');
const axios = require('axios');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const PaymentController = {
    processCardPayment: async (req, res) => {
        try {
            //to information
            console.log(req.body.user?.provider?.id);
            console.log(req.body.user.provider?.firstName+" "+req.body.provider?.lastName);
            console.log(req.body.user.provider?.email);

            //from details
            console.log("---"+req.consumer.id)

            console.log(req.body.user?.provider?.price)

            // Process payment with Stripe
            const amount = parseFloat(req.body.user?.provider?.price || '0') * 100; // Convert to cents
            const customerEmail = req.consumer?.sub || '';
            const providerEmail = req.body.user.provider?.email || '';
            const description = `Payment for service by ${req.body.user.provider?.firstName || ''} ${req.body.user.provider?.lastName || ''}`;
            
            // Create a payment intent directly with a test card token
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(amount),
                currency: 'usd',
                payment_method_types: ['card'],
                payment_method_data: {
                    type: 'card',
                    card: {
                        token: 'tok_visa',
                    },
                },
                confirm: true,
                description,
                receipt_email: customerEmail,
                off_session: true, // Process payment without user interaction
                payment_method_options: {
                    card: {
                        request_three_d_secure: 'automatic'
                    }
                }
            });

            // Create instance object with the logged values
            const instance = {
                to: req.body.user.provider?.email || null,
                name: req.body.user.provider?.firstName + " " + req.body.user.provider?.lastName || "Unknown User",
                providerName: req.body.user.provider?.firstName + " " + req.body.provider?.lastName || "Unknown Provider",
                from: req.consumer?.sub || null,          
                price: req.body.user?.provider?.price || "0"          
            };
           
            // Save transaction to database
            const savedTransaction = await Transactions.create(instance);
            
            // Save Stripe payment reference
            await StripePayment.create({
                stripePaymentId: paymentIntent.id,
                transactionId: savedTransaction.id,
                customerEmail: customerEmail,
                providerEmail: providerEmail,
                amount: amount / 100, // Convert back to dollars for storage
                status: paymentIntent.status,
                paymentMethod: paymentIntent.payment_method, // Use the created payment method ID
            });

            //now send the request to the booking.
            const bookingData = {
                "userEmail": req.consumer?.sub,
                "userName": "John Doe",
                "providerEmail": req.body.user.provider.email,
                "providerName": req.body.user.provider?.firstName + " " + req.body.user.provider?.lastName,
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
            };
        
            const bookingResponse = await axios.post(process.env.SERVER_URL+"/api/booking/success", bookingData,{
                headers: {
                    "Authorization": req.headers.authorization,
                    "Content-Type": "application/json"
                }
            });

            return res.status(200).json({
                message: "Payment successful and slot booked",
                transaction: savedTransaction.id,
                payment: paymentIntent.id,
                bookingResponse: bookingResponse.data
            });
        } catch (error) {
            console.error("Payment processing error:", error);
            
            // Specific error handling for payment method issues
            if (error.type === 'StripeInvalidRequestError' && error.raw && error.raw.param === 'payment_method') {
                return res.status(400).json({
                    error: "Invalid payment method",
                    message: "The payment method provided is invalid or not found",
                    details: error.message
                });
            }
            
            return res.status(500).json({
                error: error.message,
                message: "Failed to process payment"
            });
        }
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
    
    fetchPaymentsByEmail: async (req, res) => {
        try {
            const { email } = req.params;
            
            if (!email) {
                return res.status(400).json({ error: 'Email is required' });
            }
            
            // Find all stripe payment references associated with this email
            const payments = await StripePayment.findAll({
                where: {
                    $or: [
                        { customerEmail: email },
                        { providerEmail: email }
                    ]
                }
            });
            
            // Fetch detailed payment information from Stripe
            const detailedPayments = await Promise.all(payments.map(async (payment) => {
                try {
                    const stripePayment = await stripe.paymentIntents.retrieve(payment.stripePaymentId);
                    return {
                        ...payment.dataValues,
                        stripeDetails: stripePayment
                    };
                } catch (err) {
                    console.error(`Error fetching payment ${payment.stripePaymentId}:`, err);
                    return {
                        ...payment.dataValues,
                        stripeDetails: { error: "Could not retrieve from Stripe" }
                    };
                }
            }));
            
            res.status(200).json({ payments: detailedPayments });
        } catch (error) {
            console.error("Error fetching payments:", error);
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = PaymentController;