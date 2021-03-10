
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const database = require('./database');
const adminRoute = require('./routes/adminRoute');
const customerRoute = require('./routes/customerRoute');
const configs = require('./configs');

const app = express();
database.connect();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(customerRoute);
app.use(adminRoute);
app.listen(configs.appConfig.port, () => {
  console.log(`${configs.appConfig.appName} listening at http://localhost:${configs.appConfig.port}`);
});