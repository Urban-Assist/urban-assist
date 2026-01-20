# Payment Service - Interview Preparation Guide

## 🎯 Overview
A **Node.js microservice** for handling payment processing in the Urban Assist application using **Stripe API** integration with MySQL database persistence.

---

## 📋 Technical Stack

### Core Technologies
- **Runtime**: Node.js 18 (Alpine Linux)
- **Framework**: Express.js 4.21.2
- **Database**: MySQL 8.0
- **Payment Gateway**: Stripe API (v17.6.0)
- **Containerization**: Docker

### Key Dependencies
```json
{
  "express": "^4.21.2",      // Web framework
  "stripe": "^17.6.0",       // Payment processing
  "mysql2": "^3.12.0",       // Database driver
  "cors": "^2.8.5",          // Cross-origin resource sharing
  "body-parser": "^1.20.3",  // Request body parsing
  "dotenv": "^16.4.7"        // Environment variable management
}
```

---

## 🏗️ Architecture & Project Structure

```
paymentservice/
├── server.js                 # Entry point - starts Express server
├── package.json              # Dependencies and scripts
├── Dockerfile                # Container configuration
├── .env                      # Environment variables
└── src/
    ├── app.js                # Express app configuration
    ├── config/
    │   ├── db.js             # MySQL connection setup
    │   └── stripe.js         # Stripe client initialization
    ├── controllers/
    │   └── paymentController.js   # Request handling logic
    ├── services/
    │   └── paymentService.js      # Business logic
    ├── models/
    │   └── paymentModel.js        # Database operations
    └── routes/
        └── paymentRoutes.js       # API endpoint definitions
```

### Architecture Pattern: **MVC (Model-View-Controller)**
- **Model**: Database operations (`paymentModel.js`)
- **View**: JSON API responses
- **Controller**: Request/response handling (`paymentController.js`)
- **Service Layer**: Business logic isolation (`paymentService.js`)

---

## 🔌 API Endpoints

### POST `/api/payments/card-pay`
**Purpose**: Process credit/debit card payments via Stripe

**Request Body**:
```json
{
  "amount": 100.50,              // Payment amount in dollars
  "currency": "usd",             // Currency code (ISO 4217)
  "paymentMethodId": "pm_xxx"    // Stripe payment method ID
}
```

**Response** (Success - 200):
```json
{
  "success": true,
  "paymentStatus": "succeeded"
}
```

**Response** (Error - 400/500):
```json
{
  "error": "Amount, currency, and paymentMethodId are required"
}
```

---

## 💳 Stripe Integration Deep Dive

### Payment Flow
1. **Client sends** payment details to backend
2. **Backend creates** Stripe Payment Intent
3. **Stripe processes** the payment
4. **Save transaction** to MySQL database
5. **Return status** to client

### Key Stripe Concepts

#### Payment Intent
A Payment Intent represents the full lifecycle of a payment:
```javascript
const paymentIntent = await stripe.paymentIntents.create({
  amount: amount * 100,        // Convert dollars to cents
  currency,                    // 'usd', 'eur', etc.
  payment_method: paymentMethodId,
  confirm: true,               // Immediately attempt to confirm
  automatic_payment_methods: {
    enabled: true,
    allow_redirects: "never"   // Prevent 3D Secure redirects
  }
});
```

**Why multiply by 100?**
Stripe uses the smallest currency unit (cents for USD, pence for GBP). $100 = 10,000 cents.

#### Payment Method
Represents a customer's payment instrument (card, bank account). Created on the frontend using Stripe.js and passed to backend as `paymentMethodId`.

---

## 🗄️ Database Schema

### Table: `payments`
```sql
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,        -- Payment amount
    currency VARCHAR(10) NOT NULL,         -- Currency code
    payment_status VARCHAR(50) NOT NULL,   -- succeeded, failed, pending
    stripe_payment_id VARCHAR(255),        -- Stripe reference ID
    booking_id BIGINT,                     -- Link to booking (optional)
    user_email VARCHAR(255),               -- Customer email (optional)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_stripe_payment_id (stripe_payment_id)
);
```

### Database Connection
```javascript
const db = mysql.createConnection({
    host: process.env.DB_HOST,           // host.docker.internal
    user: process.env.DB_USER,           // urbanassist
    password: process.env.DB_PASSWORD,   // UrbanAssist@2024!
    database: process.env.DB_NAME        // demo
});
```

**Connection Type**: Direct MySQL connection (not pooled)
**Location**: Runs in Docker, connects to host machine's MySQL via `host.docker.internal`

---

## 🐳 Docker Configuration

### Dockerfile Breakdown
```dockerfile
FROM node:18-alpine          # Lightweight Linux + Node.js 18
WORKDIR /app                 # Set working directory
COPY package*.json ./        # Copy dependency files
RUN npm install              # Install dependencies
COPY . .                     # Copy application code
EXPOSE 5000                  # Expose port 5000
CMD ["npm", "start"]         # Run server.js
```

### Docker Compose Configuration
```yaml
payment:
  build:
    context: ./paymentservice
    dockerfile: Dockerfile
  container_name: urban-assist-payment
  ports:
    - "5002:5002"            # Map host:container port
  environment:
    - PORT=5002
    - DB_HOST=host.docker.internal
    - DB_USER=urbanassist
    - DB_PASSWORD=UrbanAssist@2024!
    - DB_NAME=demo
  extra_hosts:
    - "host.docker.internal:host-gateway"  # Connect to host MySQL
  networks:
    - urban-assist-network
  restart: unless-stopped
```

**Why `host.docker.internal`?**
Allows Docker container to access services running on the host machine (MySQL in this case).

---

## 🔒 Security Considerations

### Environment Variables
```env
PORT=5002
DB_HOST=host.docker.internal
DB_USER=urbanassist
DB_PASSWORD=UrbanAssist@2024!
DB_NAME=demo
STRIPE_SECRET_KEY=sk_test_xxxxx
```

**Security Best Practices**:
- ✅ Never commit `.env` files to Git
- ✅ Use different keys for dev/prod
- ✅ Rotate secrets regularly
- ✅ Use Docker secrets in production

### CORS Configuration
```javascript
app.use(cors());  // Allows all origins (dev only!)
```
**Production**: Restrict to specific origins:
```javascript
app.use(cors({
  origin: 'https://urbanassist.com'
}));
```

### Stripe Key Management
- **Secret Key** (`sk_test_`): Backend only, never expose to frontend
- **Publishable Key** (`pk_test_`): Frontend safe, used to create payment methods

---

## 📊 Payment Status Flow

```
Pending → Processing → Succeeded
                    ↓
                   Failed
```

**Common Statuses**:
- `requires_payment_method`: Awaiting payment info
- `requires_confirmation`: Needs explicit confirmation
- `processing`: Being processed by Stripe
- `succeeded`: Payment completed ✅
- `canceled`: Payment canceled
- `requires_action`: Needs 3D Secure authentication

---

## 🚨 Error Handling

### Controller Level
```javascript
try {
  const response = await PaymentService.processCardPayment(...);
  res.json(response);
} catch (error) {
  res.status(500).json({ error: error.message });
}
```

### Service Level
```javascript
try {
  const paymentIntent = await stripe.paymentIntents.create(...);
  // Save to database
  return { success: true, paymentStatus: paymentIntent.status };
} catch (error) {
  throw new Error(error.message);  // Propagate to controller
}
```

### Common Errors
- **400**: Invalid request (missing fields)
- **402**: Card declined
- **500**: Server/database error
- **Stripe errors**: Network issues, invalid API key

---

## 🔄 Payment Processing Flow (Complete)

1. **Frontend** collects card details using Stripe.js
2. **Stripe.js** tokenizes card → creates `paymentMethodId`
3. **Frontend** sends `{amount, currency, paymentMethodId}` to backend
4. **Controller** validates request
5. **Service** creates Stripe Payment Intent
6. **Stripe** processes payment with card network
7. **Service** receives payment status
8. **Model** saves transaction to MySQL
9. **Controller** returns response to frontend
10. **Frontend** shows success/failure message

---

## 🧪 Testing Stripe Integration

### Test Cards
```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0027 6000 3184
Insufficient Funds: 4000 0000 0000 9995
```

**CVV**: Any 3 digits
**Expiry**: Any future date
**ZIP**: Any 5 digits

---

## 🔧 Troubleshooting

### Common Issues

**1. Database Connection Error**
```
Error: Access denied for user 'urbanassist'@'localhost'
```
**Fix**: Create MySQL user with proper permissions

**2. Stripe API Key Error**
```
Error: No API key provided
```
**Fix**: Set `STRIPE_SECRET_KEY` in `.env`

**3. Payment Table Missing**
```
Error: Table 'demo.payments' doesn't exist
```
**Fix**: Run database setup script

**4. Docker Container Can't Connect to MySQL**
```
Error: ECONNREFUSED 127.0.0.1:3306
```
**Fix**: Use `host.docker.internal` instead of `localhost`

---

## 🎤 Common Interview Questions & Answers

### Q1: Why did you choose Node.js for the payment service?
**Answer**: 
- **Asynchronous I/O**: Perfect for handling multiple payment requests concurrently
- **JSON Native**: Easy integration with Stripe REST API
- **Fast Development**: Express.js provides simple routing and middleware
- **Microservice Friendly**: Lightweight, easy to containerize
- **NPM Ecosystem**: Excellent Stripe SDK available

### Q2: How do you ensure payment security?
**Answer**:
1. **API Keys**: Never expose secret keys to frontend
2. **HTTPS**: All payment data transmitted over encrypted connections
3. **No Card Storage**: Card details handled by Stripe.js, never touch our server
4. **Environment Variables**: Sensitive data in `.env`, not hardcoded
5. **Validation**: Input validation before processing
6. **Database Security**: Parameterized queries prevent SQL injection

### Q3: What happens if Stripe payment succeeds but database save fails?
**Answer**: 
Current implementation has a **consistency issue**. To fix:
1. **Use Stripe Webhooks**: Stripe notifies us of payment status changes
2. **Implement Retry Logic**: Try saving to DB multiple times
3. **Transaction Rollback**: If DB save fails, refund via Stripe
4. **Event Sourcing**: Log all events for recovery
5. **Monitoring**: Alert on payment-DB mismatches

### Q4: How would you scale this service for high traffic?
**Answer**:
1. **Database Connection Pooling**: Replace single connection with pool
2. **Horizontal Scaling**: Multiple service instances behind load balancer
3. **Caching**: Cache frequent queries with Redis
4. **Async Processing**: Use message queue (RabbitMQ/Kafka) for non-critical tasks
5. **CDN**: Serve static assets from CDN
6. **Database Replication**: Read replicas for queries

### Q5: Explain the MVC pattern in your service.
**Answer**:
- **Model** (`paymentModel.js`): Database queries, data persistence
- **View**: JSON responses (no traditional views in API)
- **Controller** (`paymentController.js`): Request handling, validation, response formatting
- **Service** (`paymentService.js`): Business logic separation (Stripe integration)

**Benefits**: 
- Separation of concerns
- Easier testing
- Code reusability
- Maintainability

### Q6: How do you handle payment failures?
**Answer**:
1. **Capture Error**: Stripe throws descriptive errors
2. **Log Error**: Save to logging system
3. **User Notification**: Return clear error message to frontend
4. **Retry Logic**: Some errors (network) are retriable
5. **Status Tracking**: Store failure reason in database
6. **Customer Support**: Failed payments generate support tickets

### Q7: What's the difference between Payment Intent and Payment Method?
**Answer**:
- **Payment Method**: Represents the payment instrument (card details)
  - Created on frontend using Stripe.js
  - Reusable for multiple payments
  - Example: `pm_1234abcd`

- **Payment Intent**: Represents a single payment transaction
  - Created on backend
  - Tracks payment lifecycle
  - Contains amount, currency, status
  - Example: `pi_5678efgh`

### Q8: Why do you multiply amount by 100?
**Answer**: Stripe uses the **smallest currency unit** (cents/pence) to avoid floating-point precision issues. $100.50 becomes 10050 cents. This ensures accurate calculations and prevents rounding errors.

### Q9: How would you implement webhooks?
**Answer**:
```javascript
// New endpoint
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(
    req.body, sig, process.env.WEBHOOK_SECRET
  );
  
  if (event.type === 'payment_intent.succeeded') {
    // Update database with final status
  }
  
  res.json({received: true});
});
```

### Q10: What are the limitations of your current implementation?
**Answer** (Be honest!):
1. **No connection pooling**: Single DB connection
2. **No retry logic**: Failed payments not retried
3. **No webhooks**: Not handling async payment updates
4. **No idempotency**: Duplicate requests can create multiple charges
5. **No logging**: No centralized logging system
6. **Basic error handling**: Could be more granular

**How to improve**: Implement each of the above!

---

## 🚀 Deployment Considerations

### Production Checklist
- [ ] Use Stripe live keys (`sk_live_`)
- [ ] Enable HTTPS/TLS
- [ ] Set up proper CORS
- [ ] Implement rate limiting
- [ ] Add request logging
- [ ] Set up monitoring (DataDog, New Relic)
- [ ] Configure database connection pooling
- [ ] Implement webhooks
- [ ] Add health check endpoint
- [ ] Set up CI/CD pipeline
- [ ] Configure secrets management (AWS Secrets Manager)
- [ ] Enable container orchestration (Kubernetes)

---

## 📚 Key Takeaways for Interview

### Technical Skills Demonstrated
✅ **Microservices Architecture**: Independent, containerized service
✅ **Third-party API Integration**: Stripe payment gateway
✅ **Database Design**: MySQL schema and operations
✅ **RESTful API Design**: Clear endpoint structure
✅ **Docker**: Containerization and orchestration
✅ **Environment Management**: Configuration via .env
✅ **Error Handling**: Try-catch patterns
✅ **Async/Await**: Modern JavaScript patterns
✅ **MVC Pattern**: Clean code organization

### Business Logic Understanding
- Payment processing flow
- Financial transaction handling
- Security best practices
- PCI compliance considerations (via Stripe)
- Scalability concepts

---

## 🔗 Related Microservices Integration

Your payment service integrates with:
1. **User Management Service**: Fetch user details
2. **Booking Service**: Link payments to bookings
3. **Email Service**: Send payment confirmations
4. **Frontend**: Receives payment requests

---

## 📖 Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Express.js Guide](https://expressjs.com/)
- [Docker Documentation](https://docs.docker.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

**Good luck with your interview! 🎉**
