const path = require('path');

const bodyParser = require("body-parser");
const express = require("express");
const engine = require("ejs-mate");
const { StatusCodes } = require('http-status-codes');

const config = require('./config');
const { convertErrorToObject } = require('./utils/error');
const responseBuilder  = require('./utils/response');

const app = express();

process.on('unhandledRejection', (reason, promise) => {
  let ref = Object.create(null);
  if (reason && reason.stack) {
    ref = {
      raw: convertErrorToObject(reason)
    };
  }

  if (promise) {
    ref.promise = promise;
  }

  process.exit(1);
});

process.on('uncaughtException', (err, origin) => {
  let ref = Object.create(null);
  if (err && err.stack) {
    ref = {
      raw: convertErrorToObject(err)
    };
  }

  if (origin) {
    ref.origin = origin;
  }

  process.exit(1);
});

// DB
require("./config/db")(config);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'public')));
app.engine("ejs", engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));   

app.get('/', (req, res) => {
  return res.render('dashboard');
});

app.use('/api/v1', require('./routes'));

app.use((err, req, res, next) => {
  let ref = Object.create(null);
  if (err && err.stack) {
    ref = {
      raw: convertErrorToObject(err),
      url: req.url
    };
  }

  const response = responseBuilder(StatusCodes.INTERNAL_SERVER_ERROR, 'Server error', ref);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
});

app.use('*', (req, res) => {
  return res.render('not-found');
});

app.listen(config.port, () => {
	console.log(`Server running on port ${config.port}!`);
})
.on('error', (err) => {
  if(err.errno === 'EADDRINUSE') {
    console.error(`----- Port ${port} is busy -----`);
  }
  process.exit(1);
});
