const mysql = require('mysql');
const configs = require('../configs');

// setup koneksi database
const connection = mysql.createConnection({
  host: configs.databaseConfig.host,
  user: configs.databaseConfig.user,
  password: configs.databaseConfig.password,
  database: configs.databaseConfig.database,
  port: configs.databaseConfig.port
})

module.exports = connection;