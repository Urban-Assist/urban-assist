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
