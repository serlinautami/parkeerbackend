const { databaseConfig } = require('../configs');
const { Sequelize } = require('sequelize');

// setup koneksi database
const database = new Sequelize(databaseConfig.database, databaseConfig.user, databaseConfig.password,{
  host: databaseConfig.host,
  dialect: databaseConfig.dialect,
  port: databaseConfig.port
})


module.exports = database;