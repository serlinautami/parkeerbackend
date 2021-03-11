const database  = require('../database');
const { generateRandomId }  = require('../helper');


const tableName = 'jenis_parkir';

/**
 * @name create
 * @description untuk membuat data jenis parker dan simpan database
 * @param {*} param0 
 */
const create = function({ name, biaya }) {
  const promise = new Promise(function(resolve, reject) {
    const id = generateRandomId();
    database.query(`
      INSERT INTO ${tableName} (id, name, biaya, active) 
      VALUES ('${id}', '${name}', '${biaya}', '1')
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


const update = function({ id, name, biaya }) {
  const promise = new Promise(function(resolve, reject) {
    database.query(`
      UPDATE ${tableName} 
      SET name = '${name}', biaya = '${biaya}'
      WHERE id = '${id}'
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

const remove = function(id) {
  const promise = new Promise(function(resolve, reject) {
    database.query(`
      UPDATE ${tableName} 
      SET deleted = '1'
      WHERE id = '${id}'
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
      SELECT * FROM ${tableName} WHERE name = '${name}' AND deleted = '0'
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

const get = function (isDeleted) {
  const promise = new Promise (function(resolve, reject) {
    database.query(`SELECT * FROM ${tableName} WHERE deleted = '${isDeleted ? 1 : 0}'`, function (err, rows, field) {
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


const findById = function (id) {
  const promise = new Promise (function(resolve, reject) {
    database.query(`SELECT * FROM ${tableName} WHERE id = '${id}'`, function (err, rows, field) {
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
  });

  return promise;
}

module.exports = {
  get,
  create,
  update,
  remove,
  findById,
  findByName
}