const { ParkingType }  = require('../../model');

/**
 * @name get
 * @description untuk mendapaktan data list jenis parkir
 */
const get = async function (req, res){
  try {
    const data = await ParkingType.findAll({
      where: {
        deleted: 0
      }
    })

    return res.status(200).json({
      status: 1,
      message: 'sukses',
      data
    })
  } catch (err) {
    console.log('err', err);
    return res.status(500).json({
      status: 0,
      message: 'server error!'
    })
  }
};

/**
 * @name create
 * @description untuk membuat data jenis parkir
 */
const create = async function (req, res){
  try {
    const { name, fee } = req.body;

    if(!name || !fee) {
      return res.status(400).json({
        status: 0,
        message: 'kolom nama dan biaya harus diisi!'
      })
    }

    const existData = await ParkingType.findOne({
      where: {
        name,
        deleted: 0
      }
    })

    if(existData) {
      return res.status(400).json({
        status: 0,
        message: 'Jenis parkir dengan nama ini sudah ada'
      })
    }

    await ParkingType.create({
      name,
      fee
    });

    return res.status(201).json({
      status: 1,
      message: 'Jenis parkir baru telah ditambahkan'
    })

  } catch (err) {
    console.log('err', err)
    return res.status(500).json({
      status: 0,
      message: 'server error!'
    })
  }
};

/**
 * @name update
 * @description untuk mengupdate data jenis parkir
 */
const update = async function (req, res){
  try {
    const { id } = req.params;
    const { name, fee, active } = req.body;

    if(!name || !fee) {
      return res.status(400).json({
        status: 0,
        message: 'kolom nama dan biaya harus diisi!'
      })
    }

    const data = await ParkingType.findOne({ 
      where: {
        id,
        deleted: 0,
      }
    })

    if(!data) {
      return res.status(404).json({
        status: 0,
        message: 'data tidak ditemukan!'
      })
    }

    const existName = ParkingType.findOne({
      where: {
        name,
        deleted: 0
      }
    })

    if(existName && existName.name !== data.name) {
      return res.status(400).json({
        status: 0,
        message: 'Jenis parkir dengan nama ini sudah ada!'
      })
    }


    await data.update({
      name,
      fee,
      active
    })

    return res.status(200).json({
      status: 1,
      message: 'Data jenis parkir berhasil di perbarui!'
    })
  } catch (err) {
    console.log('err', err);
    return res.status(500).json({
      status: 0,
      message: 'server error!'
    })
  }
};

/**
 * @name remove
 * @description untuk menghapus data jenis parkir
 */
const remove = async function (req, res){
  try {
    const { id } = req.params;

    const data = await ParkingType.findOne({
      where: {
        id,
        deleted: 0
      }
    })

    if(!data) {
      return res.status(404).json({
        status: 0,
        message: 'data tidak ditemukan!'
      })
    }

    await data.update({
      deleted: 1
    })

    return res.status(200).json({
      status: 1,
      message: 'Jenis parkir berhasil dihapus!'
    })

  } catch (err) {
    console.log('err', err);
    return res.status(500).json({
      status: 0,
      message: 'server error!'
    })
  }
};


module.exports = {
  get,
  create,
  update,
  remove
}