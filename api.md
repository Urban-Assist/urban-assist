# API Endpoints Documentation

## Payment Microservice
### Endpoint: `POST /api/payments/card-pay`
- **Base URL:** `http://localhost:5001`
- **Security:** ✅ Secure
- **Request Format (JSON):**
  ```json
  {
    "amount": 51,
    "currency": "usd",
    "paymentMethodId": "pm_card_visa"
  }
  ```
- **Response Format (JSON Example):**
  ```json
  {
    "status": "success",
    "transactionId": "txn_123456789",
    "message": "Payment processed successfully."
  }
  ```

---

## Email Service
### Endpoint: `POST /mail/send`
- **Security:** ❌ Not Secure
- **Request Format (JSON):**
  ```json
  {
    "to": "receiver's email",
    "subject": "subject of the email",
    "text": "html content that you want to send as body"
  }
  ```
- **Response Format (JSON Example):**
  ```json
  {
    "status": "success",
    "message": "Email sent successfully."
  }
  ```

---

## User Authentication
### Endpoint: `POST /auth/register`
- **Security:** ❌ Not Secure
- **Request Format (JSON):**
  ```json
  {
    "email": "your email",
    "password": "your password",
    "firstName": "fname",
    "lastName": "lname"
  }
  ```
- **Response Format (JSON Example):**
  ```json
  {
    "status": "success",
    "userId": "user_12345",
    "message": "User registered successfully."
  }
  ```

---

 