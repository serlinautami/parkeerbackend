const { ParkingType, ParkingVehicleList, VehicleType }  = require('../../model');

/**
 * @name get
 * @description untuk mendapaktan data list jenis parkir
 */
const get = async function (req, res){
  try {
    const data = await ParkingType.findAll({
      where: {
        deleted: 0,
      },
      include: {
        model: ParkingVehicleList,
        include: VehicleType
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
    const { name, fee, vehicle_list } = req.body;

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

    const data =  await ParkingType.create({
      name,
      fee
    });

    if(data) {
      if(vehicle_list && typeof vehicle_list === 'object' && vehicle_list.length > 0) {
        const dbPayload =  vehicle_list.map(itemId => ({ vehicle_type_id:  itemId, parking_type_id: data.id }))

        ParkingVehicleList.bulkCreate(dbPayload)
      }
    }

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
    const { name, fee, active, vehicle_list } = req.body;

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

    const existName = await ParkingType.findOne({
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


    if(data) {
      if(vehicle_list && typeof vehicle_list === 'object' && vehicle_list.length > 0) {
        await ParkingVehicleList.destroy({ where: { parking_type_id: data.id } });
        const dbPayload =  vehicle_list.map(itemId => ({ vehicle_type_id:  itemId, parking_type_id: data.id }))
        ParkingVehicleList.bulkCreate(dbPayload)
      }
    }

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


    ParkingVehicleList.destroy({
      where: {
        parking_type_id: data.id
      }
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