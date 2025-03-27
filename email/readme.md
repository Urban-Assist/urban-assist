# Email Microservice

This microservice is responsible for handling email operations within the application. It is built using Node.js and Express, and it utilizes Nodemailer for sending emails.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: You need Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: Node.js comes with npm, which is the package manager used to install dependencies.

## Installation

1. **Clone the repository**: Start by cloning the repository to your local machine.

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the email directory**: Change your working directory to the email microservice.

   ```bash
   cd email
   ```

3. **Install dependencies**: Run the following command to install all necessary dependencies.

   ```bash
   npm install
   ```

## Environment Variables

To run this application, you need to set up the following environment variables. Create a `.env` file in the `email` directory and add the following:

```plaintext
PORT=9001
EMAIL_ADDRESS=your-email@example.com
MAIL_ACCESS_TOKEN=your-email-app-password
CORS_ORIGIN=*
```

- **PORT**: The port on which the service will run.
- **EMAIL_ADDRESS**: The email address used to send emails.
- **MAIL_ACCESS_TOKEN**: The app password for the email account (especially for Gmail).
  
  ### How to Obtain an App Password for Gmail
  
  1. **Sign in to your Google Account**:
     - Go to [myaccount.google.com](https://myaccount.google.com/)
     - Sign in with your Google account credentials
  
  2. **Enable 2-Step Verification**:
     - Navigate to the "Security" tab
     - Under "Signing in to Google," find "2-Step Verification"
     - If not already enabled, follow the prompts to set it up
     - Complete the verification process
  
  3. **Generate an App Password**:
     - After enabling 2-Step Verification, go back to the "Security" tab
     - Look for "App passwords" (under "Signing in to Google")
     - Click on "App passwords" and enter your password again if prompted
  
  4. **Create a New App Password**:
     - From the "Select app" dropdown, choose "Mail" or "Other (Custom name)"
     - If choosing "Other," enter a name like "Urban Assist Email Service"
     - From the "Select device" dropdown, choose your device type or "Other"
     - Click "Generate"
  
  5. **Copy and Save the App Password**:
     - Google will display a 16-character generated password
     - Copy this password (it will only be shown once)
     - Use this password as your MAIL_ACCESS_TOKEN in the .env file
     - Click "Done"
  
  6. **Security Note**:
     - Keep this password secure
     - Do not share it or commit it to your version control system
     - Consider using environment variables in production environments

- **CORS_ORIGIN**: The origin allowed to access the service.

## Running the Service

You can run the service in different modes:

- **Development Mode**: This mode is used during development to automatically restart the server on file changes.

  ```bash
  npm run dev
  ```

- **Production Mode**: This mode is used for running the service in a production environment.

  ```bash
  npm run prod
  ```

## Docker

If you prefer using Docker, a `Dockerfile` is provided to build a Docker image for the service.

1. **Build the Docker image**:

   ```bash
   docker build -t email-service .
   ```

2. **Run the Docker container**:

   ```bash
   docker run -p 9001:9001 email-service
   ```

## Dependencies

The service uses the following main dependencies:

- **Express**: A web framework for Node.js.
- **Nodemailer**: A module for Node.js applications to send emails.
- **Dotenv**: Loads environment variables from a `.env` file.
- **CORS**: A package for providing a Connect/Express middleware that can be used to enable CORS.

## Contributing

If you want to contribute to this project, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.

## License

This project is licensed under the ISC License.
