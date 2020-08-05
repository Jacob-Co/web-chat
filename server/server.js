// 3rd party nodes
const express = require('express');

// local nodes
require('./config/config');
const path = require('path');

let app = express();
const publicPath = path.join(__dirname, '/../public');

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

app.use(express.static(publicPath));
