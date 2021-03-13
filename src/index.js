
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const database = require('./database');
const adminRoute = require('./routes/adminRoute');
const customerRoute = require('./routes/customerRoute');
const configs = require('./configs');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(customerRoute);
app.use(adminRoute);


// jalankan database
database
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(error => console.error('Unable to connect to the database:', error))

database.sync();

// jalankan aplikasi
app.listen(configs.appConfig.port, () => {
  console.log(`${configs.appConfig.appName} listening at http://localhost:${configs.appConfig.port}`);
});