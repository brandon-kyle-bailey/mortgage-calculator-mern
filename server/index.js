const express = require('express');
const path = require('path');

const apiRouter = require('./routes/index.routes');

require('dotenv').config();

const PORT = process.env.PORT || 8000;
const API_VERSION = process.env.API_VERSION || 'v1';

const app = express();

app.use(express.json());

app.use(`/api/${API_VERSION}`, apiRouter);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(8000, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

module.exports = app;
