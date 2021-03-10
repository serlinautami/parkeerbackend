const database  = require('../database');
const { generateRandomId }  = require('../helper');


const tableName = 'tarif_parkir';

/**
 * @name create
 * @description untuk membuat data tarif parker dan simpan database
 * @param {*} param0 
 */
const create = function({ jenis_parkir_id, biaya }) {
  const promise = new Promise(function(resolve, reject) {
    const id = generateRandomId();
    database.query(`
      INSERT INTO ${tableName} (id, jenis_parkir_id, biaya) 
      VALUES ('${id}', '${jenis_parkir_id}', '${biaya}')
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

module.exports = {
  create,
}