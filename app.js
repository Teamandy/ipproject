const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./src/api/router');

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://admin:admin2019@ds157097.mlab.com:57097/forms');
mongoose.connection
  .once('open', () => console.log('mongoDB is now connected'))
  .on('error', error => console.log('error connecting mongoDB', error.message));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));

app.use('/forms', router);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server is running at port 3000...');
});
