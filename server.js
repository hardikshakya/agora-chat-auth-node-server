const express = require('express');
const axios = require('axios').default;
const cors = require('cors');
const { ChatTokenBuilder } = require('agora-token');

// Import database connection and User model
const connectDB = require('./config/db');
const User = require('./models/user');

const PORT = process.env.PORT || 5000;
const expirationInSeconds = 86400;

const {
  AGORA_APP_ID: agoraAppId,
  AGORA_APP_CERTIFICATE: agoraAppCertificate,
  CHAT_REST_API_DOMAIN: chatRestApiDomain,
  CHAT_ORG_NAME: chatOrgName,
  CHAT_APP_NAME: chatAppName,
} = process.env;

const app = express();

app.use(cors());
app.use(express.json());

// Define a simple GET route for the root UR
app.get('/', (req, res) => res.send('API Running'));

/**
 * POST route for user registration.
 * It receives the user's username, nickname, and password in the request body.
 * It then sends a request to the Agora API to register the user, and saves the user's information in the database.
 */
app.post('/register', async (req, res) => {
  const { username, nickname = null, password } = req.body;
  const chatRegisterURL = `${chatRestApiDomain}/${chatOrgName}/${chatAppName}/users`;

  const appToken = ChatTokenBuilder.buildAppToken(
    agoraAppId,
    agoraAppCertificate,
    expirationInSeconds
  );

  const userData = {
    username,
    password,
    nickname,
  };

  try {
    const agoraResponse = await axios.post(chatRegisterURL, userData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${appToken}`,
      },
    });

    const {
      entities: [{ uuid: userUuid }],
    } = agoraResponse;

    // WARNING: Storing passwords in plain text is not secure.
    // Consider using a library like bcrypt to hash passwords before storing them.
    const user = await User.create({
      userUuid,
      chatUsername: username,
      chatNickname: nickname,
      password,
      activated: true,
    });

    return res.status(201).json({
      statusCode: 201,
      message: 'User Registered Successfully!',
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ statusCode: 400, message: 'Registration Failed', error });
  }
});

/**
 * POST route for user login.
 * It receives the user's username and password in the request body.
 * It then checks the database for a user with the provided username and password.
 * If a match is found, it generates a user token and sends it in the response.
 */
app.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  // WARNING: Comparing passwords in plain text is not secure.
  // Consider using a library like bcrypt to hash passwords and then compare.
  const agoraUserInfo = await User.findOne({
    chatUsername: userName,
    password,
  });
  if (!agoraUserInfo) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Invalid username or password',
    });
  }

  const userToken = ChatTokenBuilder.buildUserToken(
    agoraAppId,
    agoraAppCertificate,
    agoraUserInfo.userUuid,
    expirationInSeconds
  );
  return res.status(200).json({
    statusCode: 200,
    message: 'Login Successful',
    data: {
      userUuid: agoraUserInfo.userUuid,
      chatUserName: agoraUserInfo.chatUsername,
      userToken,
    },
  });
});

// Connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Database connection failed', error);
  });
