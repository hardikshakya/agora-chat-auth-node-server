# Agora Chat Auth Node Server

Written in Node.js, using `express` framework to create a RESTful webservice for generating user tokens for user with the AgoraChat's [Chat SDK](https://www.agora.io/en/products/chat/).

## Getting Started

Follow these steps to get a copy of the project running on your local machine for development and testing.

### Prerequisites

- Node.js
- MongoDB
- Agora account with Chat enabled

### Installation Steps

1. Clone the repository

```bash
git clone https://github.com/hardikshakya/agora-chat-auth-node-server.git
```

2. Install dependencies

```bash
cd agora-chat-auth-node-server
npm install
```

3. Create a `.env` file in the root directory of the project, and add your environment variables. Refer to `example.env` for the required environment variables.

4. Start the server

```bash
npm start
```

## How to Use

The application provides the following endpoints:

- `GET /`: Test endpoint to verify if the server is running.
- `POST /register`: Register a new user. The request body should include `username`, `nickname`, and `password`.
- `POST /login`: Login a user. The request body should include `username` and `password`.

## Important Note

This application stores and compares passwords in plain text, which is not secure. In a production application, it's crucial to hash passwords for security. Consider using a library like bcrypt for this purpose.

## Technologies Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Agora Chat](https://www.agora.io/en/products/chat/)
- [MongoDB](https://www.mongodb.com/)

## Licensing

This project is licensed under the ISC License.
