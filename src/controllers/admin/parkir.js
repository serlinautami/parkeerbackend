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
      status: 1,
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

const updateJenisParkir = async function (req, res) {
  const { id } = req.params;
  const { name, biaya } = req.body;

  if(!id) {
    return res.status(400).json({
      status: 0,
      message: 'Missing params'
    })
  }

  if(!name || !biaya) {
    return res.status(400).json({
      status: 0,
      message: 'kolom nama dan biaya harus diisi'
    })
  }

  try {
    const existName = await JenisParkir.findByName(name);

    if(existName && existName.id !== id) {
      return res.status(400).json({
        status: 0,
        message: 'jenis parkir dengan nama ini sudah ada!'
      })
    }

    await JenisParkir.update({ id, name, biaya })
    return res.status(201).json({
      status: 1,
      message: 'item berhasil di perbarui!'
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
    console.log('err', err)
    return res.status(500).json({
      status: 0,
      message: 'server error'
    })
  }
}


const deleteJenisParkir = async function (req, res) {
  const { id } = req.params;
  try {

    if(!id) {
      return res.status(400).json({
        status: 0,
        message: 'Missing Params',
        data
      })
    }

    // const data = await JenisParkir.get();
    await JenisParkir.remove(id);

    return res.status(200).json({
      status: 1,
      message: 'berhasil menghapus jenis parkir',
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
  createJenisParkir,
  updateJenisParkir,
  deleteJenisParkir
}