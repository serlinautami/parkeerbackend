const bcrypt = require('bcrypt');
const { User } = require('../../model');
const { appConfig } = require('../../configs');

const get = async function(req, res) {
  try {
    const data = await User.get({ 
      role: 'customer' 
    });
    
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
};


const getMemberAdmin = async function(req, res) {
  try {
    const data = await User.get({ 
      role: 'admin' 
    });
    
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
};


/**
 * @name createMemberAdmin
 * @description membuat member admin
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createMemberAdmin = async function(req, res) {
  try {
    const { name, email } = req.body;

    if(!name || !email) {
      return res.status(400).json({
        status: 0,
        message: 'kolom nama dan email harus diisi'
      })
    }

    // check exisiting user
    const existUser = await User.findByEmail(email);
    if(existUser) {
      return res.status(400).json({
        status: 0,
        message: 'user dengan email ini sudah terdaftar di aplikasi'
      })
    }

    // generate password
    const password = await bcrypt.hash(appConfig.adminDefaultPassword, 10); 

    await User.create({ name, email, password, role: 'admin' })

    return res.status(201).json({
      status: 1,
      message: 'member admin berhasil dibuat'
    });

  } catch (err) {
    console.log('err', err);
    return res.status(500).json({
      status: 0,
      message: 'server error'
    })
  }
}

const update = function(req, res) {};

module.exports = {
  get,
  update,
  getMemberAdmin,
  createMemberAdmin,
}