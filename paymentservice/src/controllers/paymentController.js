const PaymentService = require('../services/paymentService');
const CreateCustomerService = require('../services/CreateStripeCustomer.js');
const { StripePayment } = require('../models/paymentModel.js');
const axios = require('axios');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Op } = require('sequelize'); // Import Sequelize operators
const PDFDocument = require('pdfkit');

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
           
             
            
            // Save Stripe payment reference
            await StripePayment.create({
                stripePaymentId: paymentIntent.id,
                
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
                "transactionId": paymentIntent.id,
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
                transaction: paymentIntent.id,
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
                    [Op.or]: [
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
    },

    getPaymentReceipt: async (req, res) => {
        const { paymentId } = req.params;
        
        if (!paymentId) {
            return res.status(400).json({ error: 'Payment ID is required' });
        }
        
        try {
            // Fetch payment details from database
            const paymentRecord = await StripePayment.findOne({
                where: { stripePaymentId: paymentId }
            });
            
            if (!paymentRecord) {
                return res.status(404).json({ error: 'Payment record not found' });
            }
            
            // Sanitize the amount to ensure it's a number
            const amount = parseFloat(paymentRecord.amount) || 0;
            
            // Set response headers first
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=payment_receipt_${paymentId}.pdf`);
            
            // Create the PDF document
            const doc = new PDFDocument({ 
                margin: 50,
                size: 'A4'
            });
            
            // Pipe the PDF to the response
            doc.pipe(res);
            
            try {
                // Add content to the PDF
                
                // Header section with logo
                doc
                    .fontSize(24)
                    .fillColor('#0066cc')
                    .text('Urban Assist', { align: 'center' })
                    .fontSize(16)
                    .text('Payment Receipt', { align: 'center' })
                    .moveDown(1);
                
                // Receipt information box
                doc
                    .roundedRect(50, doc.y, doc.page.width - 100, 70, 5)
                    .fillAndStroke('#f0f0f0', '#cccccc');
                
                const boxY = doc.y + 15;
                doc
                    .fillColor('#333333')
                    .fontSize(12)
                    .text(`Receipt ID: ${paymentId.substring(0, 12)}...`, 70, boxY)
                    .text(`Date: ${new Date(paymentRecord.createdAt).toLocaleDateString()}`, 70, boxY + 20)
                    .text(`Status: ${(paymentRecord.status || 'processed').toUpperCase()}`, 70, boxY + 40)
                    .moveDown(4);
                
                // Customer and Provider section
                doc
                    .fontSize(14)
                    .fillColor('#0066cc')
                    .text('Payment Information', { underline: true })
                    .moveDown(1);
                
                // From section (Customer)
                doc
                    .fillColor('#333333')
                    .fontSize(12)
                    .text('From (Customer):', { continued: true })
                    .fillColor('#666666')
                    .text(` ${paymentRecord.customerEmail || 'N/A'}`)
                    .moveDown(0.5);
                
                // To section (Provider)
                doc
                    .fillColor('#333333')
                    .fontSize(12)
                    .text('To (Service Provider):', { continued: true })
                    .fillColor('#666666')
                    .text(` ${paymentRecord.providerEmail || 'N/A'}`)
                    .moveDown(2);
                
                // Payment amount in a box
                doc
                    .roundedRect(doc.page.width / 2 - 75, doc.y, 150, 60, 5)
                    .fillAndStroke('#e6f0ff', '#0066cc');
                
                const amountBoxY = doc.y + 10;
                doc
                    .fillColor('#0066cc')
                    .fontSize(14)
                    .text('Amount Paid:', doc.page.width / 2, amountBoxY, { align: 'center' })
                    .fontSize(20)
                    .text(`$${amount.toFixed(2)}`, doc.page.width / 2, amountBoxY + 25, { align: 'center' })
                    .moveDown(3);
                
                // Payment details
                doc
                    .fontSize(14)
                    .fillColor('#0066cc')
                    .text('Transaction Details', { underline: true })
                    .moveDown(1);
                
                doc.fillColor('#333333').fontSize(12);
                
                // Payment method
                doc.text('Payment Method: ', { continued: true })
                   .fillColor('#666666')
                   .text(paymentRecord.paymentMethod ? `Stripe (${paymentRecord.paymentMethod})` : 'Credit Card')
                   .fillColor('#333333')
                   .moveDown(0.5);
                
                // Transaction ID
                doc.text('Transaction ID: ', { continued: true })
                   .fillColor('#666666')
                   .text(paymentRecord.stripePaymentId)
                   .fillColor('#333333')
                   .moveDown(0.5);
                
                // Created date
                doc.text('Transaction Date: ', { continued: true })
                   .fillColor('#666666')
                   .text(new Date(paymentRecord.createdAt).toLocaleString())
                   .fillColor('#333333')
                   .moveDown(0.5);
                
                // Updated date
                doc.text('Last Updated: ', { continued: true })
                   .fillColor('#666666')
                   .text(new Date(paymentRecord.updatedAt).toLocaleString())
                   .moveDown(2);
                
                // Terms and additional information
                doc
                    .fontSize(10)
                    .fillColor('#999999')
                    .text('This receipt serves as confirmation of your payment transaction.', { align: 'center' })
                    .text('For any questions or concerns, please contact support@urbanassist.com', { align: 'center' })
                    .moveDown(1)
                    .text('Thank you for using Urban Assist!', { align: 'center' });
                
                // Add page number at the bottom
                const pageHeight = doc.page.height;
                doc
                    .fontSize(8)
                    .text(
                        `Generated on ${new Date().toLocaleString()} | Page 1 of 1`,
                        50,
                        pageHeight - 50,
                        { align: 'center' }
                    );
                
                // Finalize PDF and send response
                doc.end();
            } catch (pdfError) {
                // If we have an error during PDF generation
                console.error("PDF generation error:", pdfError);
                
                // Attempt to end the document if it hasn't been ended yet
                try {
                    doc.end();
                } catch (endError) {
                    // Ignore any errors from ending the document
                }
                
                // If headers haven't been sent yet, we can send an error response
                if (!res.headersSent) {
                    res.status(500).json({ error: "Error generating PDF receipt" });
                }
            }
        } catch (error) {
            console.error("Error retrieving payment data:", error);
            
            // Only send error response if headers haven't been sent
            if (!res.headersSent) {
                res.status(500).json({ error: "Error generating payment receipt" });
            }
        }
    }
};

module.exports = PaymentController;