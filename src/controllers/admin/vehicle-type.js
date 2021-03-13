const { VehicleType } = require('../../model');

/**
 * @name  get
 * @description untuk get data kendaraan
 */
const get = async function (req, res) {
  try {
    const data = await VehicleType.findAll({ 
      where: {
        deleted: 0,
      }
     })

     return res.status(200).json({
       status: 0,
       message: 'succcess',
       data
     })

  } catch(err) {
    console.log('err', err);
    return res.status(500).json({
      status: 0,
      message: 'server error'
    })
  }
}

/**
 * @name create
 * @description untuk membuat data jenis kendaraan
 */
const create = async function (req, res) {
  try {
    const { name } = req.body;

    if(!name) {
      return res.status(400).json({
        status: 0,
        message: 'kolom nama harus diisi!'
      })
    }

    const existData = await VehicleType.findOne({
      where: {
        name,
        deleted: 0,
      }
    });
    
    if(existData) {
      return res.status(400).json({
        status: 0,
        message: 'jenis kendaraan dengan nama ini sudah ada!'
      })
    }

    await VehicleType.create({ name })


    return res.status(201).json({
      status: 1,
      message: 'Berhasil menambahkan jenis kendaraan baru'
    })


    
  } catch (err) {
    console.log('err', err);
    return res.status(500).json({
      status: 0,
      message: 'server error!'
    })
  }
}


/**
 * @name update
 * @description untuk mengedit data jenis kendaraan
 */
const update = async function(req, res) {
  try {
    const { id } = req.params;
    const { name, active } = req.body
    
    if(!name) {
      return res.status(400).json({
        status: 0,
        message: 'kolom nama harus diisi!'
      })
    }

    const data = await VehicleType.findOne({
      where: {
        id,
        deleted: 0,
      }
    });

    if(!data) {
      return res.status(404).json({
        status: 0,
        message: 'data tidak ditemukan'
      })
    }

    const existNameData = await VehicleType.findOne({
      where: {
        name,
        deleted: 0
      }
    })

    if(existNameData && existNameData.name !== data.name) {
      return res.status(400).json({
        status: 0,
        message: 'Jenis kendaraan dengan nama ini sudah ada!'
      })
    }


    await data.update({
      name,
      active
    })


    return res.status(200).json({
      status: 1,
      message: 'Jenis kendaraan berhasil di perbarui'
    })
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: 'server error!'
    })
  }
}

/**
 * @name remove untuk menghapus data kendaraan
 * @description untuk membuat data jenis kendaraan
 */
const remove = async function(req, res) {
  try {
    const { id } = req.params;

    const data = await VehicleType.findOne({ where: { id, deleted: 0 } });

    if(!data) {
      return res.status(404).json({
        status: 0,
        message: 'data tidak ditemukan!'
      })
    }

    await data.update({ deleted: 1 })

    return res.status(200).json({
      status: 1,
      message: 'Data berhasil dihapus'
    })
  } catch (err) {
    console.log('err', err)
    return res.status(500).json({
      status: 0,
      message: 'server error'
    })
  }
}


module.exports = {
  get,
  create,
  update,
  remove
}