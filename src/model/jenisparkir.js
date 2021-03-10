const database  = require('../database');
const { generateRandomId }  = require('../helper');


const tableName = 'jenis_parkir';

/**
 * @name create
 * @description untuk membuat data jenis parker dan simpan database
 * @param {*} param0 
 */
const create = function({ name }) {
  const promise = new Promise(function(resolve, reject) {
    const id = generateRandomId();
    database.query(`
      INSERT INTO ${tableName} (id, name, active) 
      VALUES ('${id}', '${name}', '1')
    `, function (err, rows, field) {
        if(err) {
          return reject(err);
        }
        console.log('rows', rows);
        console.log('field', rows);
        return resolve(rows);
    })
  })

  return promise;
}

/**
 * @name findByName
 * @description query menccari jenis parkir berdasarkan nama
 * @param {*} param0 
 */
const findByName = function(name) {
  const promise = new Promise(function(resolve, reject) {
    database.query(`
      SELECT * FROM ${tableName} WHERE name = '${name}'
    `, function(err, rows, field) {
      if(err) {
        return reject(err);
      }
      console.log('rows', rows);
      console.log('field', rows);
      if(!rows || rows.length === 0) {
        return resolve(null);
      }
      return resolve(rows[0]);
    })
  })

  return promise
}

const get = function () {
  const promise = new Promise (function(resolve, reject) {
    database.query(`SELECT * FROM ${tableName}`, function (err, rows, field) {
      if(err) {
        return reject(err);
      }

      console.log('rows', rows);
      console.log('field', rows);
      return resolve(rows);
    })
  });

  return promise;
}

module.exports = {
  get,
  create,
  findByName
}