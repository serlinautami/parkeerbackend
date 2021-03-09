const database  = require('../database');
const uuid4  = require('uuid4');

/**
 * @name create
 * @description untuk menambahkan data user ke database
 * @param {*} param0 
 */
const create = function({ name, email, password }){
  const promise = new Promise(function(resolve, reject){
    const generateId = uuid4();

    database.query(`
      INSERT INTO users (id, name, email, password) 
      VALUES ('${generateId}', '${name}', '${email}', '${password}')`,
      function(err, rows, field) {
        if(err) {
          return reject(err);
        }
        console.log('field', field);
        console.log('rows', rows);
        return resolve(rows);
      });     
  })
  return promise
}

/**
 * @name findByEmail
 * @description untuk mencari user bedasarkan email 
 * @param {*} email 
 */
const findByEmail = function(email) {
  const promise = new Promise(function(resolve, reject) {
    database.query(`
      SELECT * FROM users WHERE email = '${email}'`,
      function(err, rows, field){
        if(err) {
          return reject(err);
        }
        console.log('field', field);
        console.log('rows', rows);
        
        if(!rows || rows.length === 0) {
          return resolve(null);
        }
        return resolve(rows[0])
      })
  });
  return promise;
}


/**
 * @name findById
 * @description untuk mencari user bedasarkan id 
 * @param {*} email 
 */
const findById = function(id) {
  const promise = new Promise(function(resolve, reject) {
    database.query(`
      SELECT * FROM users WHERE id = '${id}'`,
      function(err, rows, field){
        if(err) {
          return reject(err);
        }
        console.log('field', field);
        console.log('rows', rows);
        if(!rows || rows.length === 0) {
          return resolve(null);
        }
        return resolve(rows[0])
      })
  });
  return promise;
}

module.exports = {
  create,
  findById,
  findByEmail,
}