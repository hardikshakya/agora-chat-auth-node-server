const express = require('express');

const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => res.send('API Running'));

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });
