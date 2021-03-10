const database  = require('../database');
const { generateRandomId }  = require('../helper');

const tableName = 'users';

/**
 * @name create
 * @description untuk menambahkan data user ke database
 * @param {*} param0 
 */
const create = function({ name, email, password }){
  const promise = new Promise(function(resolve, reject){
    const generateId = generateRandomId();

    database.query(`
      INSERT INTO ${tableName} (id, name, email, password) 
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
      SELECT * FROM ${tableName} WHERE email = '${email}'`,
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
      SELECT * FROM ${tableName} WHERE id = '${id}'`,
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
 * @name updateAccessToken
 * @description untuk update access token user
 * @param {*} email 
 */
const updateAccessToken = function(userId, token) {
  const promise = new Promise(function(resolve, reject) {
    database.query(`
      UPDATE ${tableName}
      SET accessToken = '${token}'
      WHERE id = '${userId}';
    `,
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
 * @name findByAccessToken
 * @description untuk mencari user bedasarkan email 
 * @param {*} email 
 */
const findByAccessToken = function(token) {
  const promise = new Promise(function(resolve, reject) {
    database.query(`
      SELECT id, name, email, createdAt, updatedAt, role FROM ${tableName} WHERE accessToken = '${token}'`,
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
  updateAccessToken,
  findByAccessToken
}