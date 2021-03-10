const { JenisParkir, User, TarifParkir } = require('../../model');

const createJenisParkir = async function (req, res) {
  const { name, biaya } = req.body;

  if(!name || !biaya) {
    return res.status(400).json({
      status: 0,
      message: 'kolom nama dan biaya harus diisi'
    })
  }

  try {
    const existName = await JenisParkir.findByName(name);

    if(existName) {
      return res.status(400).json({
        status: 0,
        message: 'jenis parkir dengan nama ini sudah ada!'
      })
    }

    await JenisParkir.create({ name, biaya })
    return res.status(201).json({
      status: 0,
      message: 'item berhasil ditambahkan!'
    })
  } catch (err) {
    console.log('err', err)
    return res.status(500).json({
      status: 0,
      message: 'server error'
    })
  }
}


const getJenisParkir = async function (req, res) {
  try {
    const data = await JenisParkir.get();
    return res.status(200).json({
      status: 1,
      message: 'success',
      data
    })
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: 'server error'
    })
  }
}


module.exports = {
  getJenisParkir,
  createJenisParkir
}