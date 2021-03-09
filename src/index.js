
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const database = require('./database');
const router = require('./routes');
const configs = require('./configs');

const app = express();
database.connect();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(router)
app.listen(configs.appConfig.port, () => {
  console.log(`${configs.appConfig.appName} listening at http://localhost:${configs.appConfig.port}`)
})