# User REST API

A simple REST API built with NestJS, MongoDB, and RabbitMQ that integrates with the [Reqres](https://reqres.in/) API. This application provides endpoints for managing users and their avatars, including creating users, retrieving user data, and handling avatars.

## Features

- **POST /api/users**: Create a new user entry and send a dummy email and RabbitMQ event.
- **GET /api/user/{userId}**: Retrieve user data from Reqres.
- **GET /api/user/{userId}/avatar**: Retrieve and store the user's avatar image, returning its base64 representation.
- **DELETE /api/user/{userId}/avatar**: Remove the avatar image from the file system and delete its entry from the database.

## Prerequisites

- **Node.js** 14.x or above
- **MongoDB** 4.4 or above
- **RabbitMQ** 3.7 or above
- **NestJS** 8.x or above
- **TypeScript** 3.4 or above

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/user-rest-api.git
   cd user-rest-api
   ```

2. **Install dependencies::**
     ```bash
     npm install
     ```

3. **Setup environment variables:**
   Create a .env file in the root directory and configure the following

   ```bash
   PORT=3000
   MONGODB_URI=
   RABBITMQ_URL=
   ```

## Running the Application

1. **Ensure your environment variables are set up:**

   Make sure you have created a `.env` file in the root directory with the required environment variables as described in the [Setup environment variables](#setup-environment-variables) section.

2. **Start the application:**

   To run the application in development mode, use the following command:

   ```bash
   npm start
   ```
   This command will start the NestJS application

## Running Tests

To ensure the functionality and reliability of the application, a suite of tests has been included. You can run these tests using the following commands:

1. **Run All Tests:**

   To run all unit and functional tests, use:

   ```bash
   npm run test
   ```
   This will execute all tests and provide a summary of the results.
