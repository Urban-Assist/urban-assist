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
                // Define colors for consistent branding
                const primaryColor = '#0066cc';
                const secondaryColor = '#004080';
                const accentColor = '#66a3ff';
                const textColor = '#333333';
                const lightGray = '#f8f8f8';
                
                // Add content to the PDF
                
                // Modern header with logo text
                doc.rect(0, 0, doc.page.width, 120)
                   .fill(primaryColor);
                
                // Center the header text
                doc.fontSize(36)
                   .fillColor('#ffffff')
                   .text('Urban Assist', 0, 40, { align: 'center' })
                   .fontSize(14)
                   .text('Professional Service Solutions', 0, 85, { align: 'center' });
                
                // Receipt title with better spacing
                doc.fontSize(24)
                   .fillColor(secondaryColor)
                   .text('PAYMENT RECEIPT', 0, 140, { align: 'center' })
                   .moveDown(0.5);
                
                // Horizontal line with proper positioning
                const lineY = doc.y + 5;
                doc.moveTo(50, lineY)
                   .lineTo(doc.page.width - 50, lineY)
                   .stroke(accentColor)
                   .moveDown(1.5);
                
                // Create two columns for the receipt information with better spacing
                const colWidth = (doc.page.width - 120) / 2;
                const startY = doc.y;
                
                // Left column - Transaction details
                doc.fontSize(14)
                   .fillColor(secondaryColor)
                   .text('TRANSACTION DETAILS', 60, startY, { width: colWidth })
                   .moveDown(0.5);
                
                // Properly position the transaction details box
                const detailsBoxY = doc.y;
                doc.roundedRect(60, detailsBoxY, colWidth, 120, 5)
                   .fillAndStroke(lightGray, accentColor);
                
                doc.fillColor(textColor)
                   .fontSize(11)
                   .text(`Receipt ID: ${paymentId.substring(0, 15)}...`, 70, detailsBoxY + 15)
                   .text(`Transaction Date: ${new Date(paymentRecord.createdAt).toLocaleDateString()}`, 70, detailsBoxY + 40)
                   .text(`Status: ${(paymentRecord.status || 'processed').toUpperCase()}`, 70, detailsBoxY + 65)
                   .text(`Payment Method: Credit Card`, 70, detailsBoxY + 90);
                
                // Right column - Amount information (aligned with left column)
                const rightColX = 60 + colWidth + 20; // Add spacing between columns
                
                doc.fontSize(14)
                   .fillColor(secondaryColor)
                   .text('PAYMENT AMOUNT', rightColX, startY, { width: colWidth })
                   .moveDown(0.5);
                
                // Properly position the payment amount box
                doc.roundedRect(rightColX, detailsBoxY, colWidth, 120, 5)
                   .fillAndStroke('#e6f0ff', accentColor);
                
                // Center the amount in the right box
                doc.fillColor(secondaryColor)
                   .fontSize(14)
                   .text('Amount Paid:', rightColX, detailsBoxY + 30, { width: colWidth, align: 'center' })
                   .fontSize(28)
                   .fillColor(primaryColor)
                   .text(`$${amount.toFixed(2)}`, rightColX, detailsBoxY + 60, { width: colWidth, align: 'center' });
                
                // Add space after the boxes
                doc.moveDown(7);
                
                // Customer and Provider information with better spacing
                const infoY = doc.y;
                doc.fontSize(14)
                   .fillColor(secondaryColor)
                   .text('Payment Information', 0, infoY, { align: 'center' })
                   .moveDown(1);
                
                // Create modern boxes for customer and provider with consistent height
                const boxHeight = 80;
                const partyBoxY = doc.y;
                
                // Customer box
                doc.roundedRect(60, partyBoxY, colWidth, boxHeight, 5)
                   .fillAndStroke(lightGray, '#cccccc');
                
                doc.fillColor(secondaryColor)
                   .fontSize(12)
                   .text('FROM (CUSTOMER)', 60, partyBoxY + 15, { width: colWidth, align: 'center' })
                   .fillColor(textColor)
                   .fontSize(11)
                   .text(paymentRecord.customerEmail || 'N/A', 60, partyBoxY + 40, { width: colWidth, align: 'center' });
                
                // Provider box (aligned with customer box)
                doc.roundedRect(rightColX, partyBoxY, colWidth, boxHeight, 5)
                   .fillAndStroke(lightGray, '#cccccc');
                
                doc.fillColor(secondaryColor)
                   .fontSize(12)
                   .text('TO (SERVICE PROVIDER)', rightColX, partyBoxY + 15, { width: colWidth, align: 'center' })
                   .fillColor(textColor)
                   .fontSize(11)
                   .text(paymentRecord.providerEmail || 'N/A', rightColX, partyBoxY + 40, { width: colWidth, align: 'center' });
                
                // Add more space before footer
                doc.moveDown(6);
                
                // Footer information with better alignment
                doc.fontSize(10)
                   .fillColor('#666666')
                   .text('This receipt serves as confirmation of your payment transaction.', {
                       width: doc.page.width - 100,
                       align: 'center'
                   })
                   .text('For any questions or concerns, please contact support@urbanassist.com', {
                       width: doc.page.width - 100,
                       align: 'center'
                   });
                
                // Add page number with better positioning
                doc.fontSize(8)
                   .text(`Generated on ${new Date().toLocaleString()} | Page 1 of 1`, 0, doc.page.height - 50, {
                       align: 'center'
                   });
                
                // Add an improved "Urban Assist" stamp in the bottom right
                const stampX = doc.page.width - 130;
                const stampY = doc.page.height - 130;
                const stampRadius = 50;
                
                // Create more impressive stamp effect with shadow
                doc.circle(stampX + 3, stampY + 3, stampRadius)
                   .fillOpacity(0.3)
                   .fill('#000000'); // Shadow effect
                
                // Main stamp circle
                doc.circle(stampX, stampY, stampRadius)
                   .fillOpacity(0.9)
                   .fill(primaryColor);
                
                // Add inner circle for a more professional look
                doc.circle(stampX, stampY, stampRadius - 5)
                   .lineWidth(1)
                   .fillOpacity(0)
                   .strokeOpacity(0.8)
                   .stroke('#ffffff');
                
                // Add outer decorative border
                doc.circle(stampX, stampY, stampRadius - 2)
                   .dash(3, { space: 4 })
                   .strokeOpacity(0.9)
                   .stroke('#ffffff');
                
                // Add text to stamp with better positioning
                doc.fillOpacity(1)
                   .strokeOpacity(1)
                   .fillColor('#ffffff')
                   .fontSize(16)
                   .font('Helvetica-Bold')
                   .text('URBAN', 0, stampY - 15, { width: doc.page.width - 60, align: 'right' })
                   .fontSize(18)
                   .text('ASSIST', 0, stampY + 5, { width: doc.page.width - 60, align: 'right' });
                
                // Add "Official Receipt" text to the stamp
                doc.fontSize(8)
                   .text('OFFICIAL RECEIPT', 0, stampY + 30, { width: doc.page.width - 60, align: 'right' });
                
                // Add star effect in the stamp for extra styling
                const starPoints = 8;
                const innerRadius = 15;
                const outerRadius = 8;
                
                doc.save();
                doc.translate(stampX, stampY);
                
                doc.moveTo(0, -outerRadius);
                
                for (let i = 1; i <= starPoints * 2; i++) {
                    const angle = (Math.PI * i) / starPoints;
                    const radius = i % 2 === 0 ? outerRadius : innerRadius;
                    const x = radius * Math.sin(angle);
                    const y = -radius * Math.cos(angle);
                    doc.lineTo(x, y);
                }
                
                doc.closePath()
                   .fillOpacity(0.7)
                   .fill('#ffffff');
                doc.restore();
                
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