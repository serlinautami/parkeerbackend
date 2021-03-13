const bcrypt = require('bcrypt');
const { User } = require('../../model');
const { appConfig } = require('../../configs');

/**
 * @name getCustomer
 * @description controller untuk data customer
 */
const getCustomer = async function(req, res) {
  try {
    const data = await User.findAll({ where: { role: 'customer', deleted: 0 }, attributes: {
      exclude: ['access_token', 'password', 'deleted']
    } });
    
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
 * @name getMemberAdmin
 * @description controller untuk get data user admin
 */
const getMemberAdmin = async function(req, res) {
  try {
    const data = await User.findAll({ 
      where: { role: 'admin', deleted: 0 },
      attributes: {
        exclude: ['access_token', 'password', 'deleted']
      }
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
    const existUser = await User.findOne({ where: { email, deleted: 0 } });
    if(existUser) {
      return res.status(400).json({
        status: 0,
        message: 'user dengan email ini sudah terdaftar di aplikasi'
      })
    }

    // generate password
    const password = await bcrypt.hash(appConfig.adminDefaultPassword, 10); 

    await User.create({ name, email, password, role: 'admin', active: 1 })

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


const removeMemberAdmin = async function (req, res) {
  try {
    const { id } = req.params;

    await User.update({ 
      deleted: 1 
    }, {
      where: {
        id,
        role: 'admin'
      }
    });

    return res.status(200).json({
      status: 1,
      message: 'Admin berhasil dihapus dari daftar!'
    })

  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: 'server error'
    })
  }
}

const resetPassword = async function (req, res) {
  try {
    const { id } = req.params;

    const password = await bcrypt.hash(appConfig.adminDefaultPassword, 10);

    await User.update({ password  }, {
      where: { id, role: 'admin', deleted: 0 }
    });

    return res.status(200).json({
      status: 0,
      message: 'Password berhasil direset'
    })

  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: 'server error'
    })
  }
}


const createSuperAdmin = async function (req, res) {
    try {
      const { email } = req.body;
      if(!email) {
        return res.status(405).json({
          status: 0,
          message: 'Method not Allowed'
        })
      }
      
      const existSuperAdmin = await User.findOne({
        where: {
          role: 'super-admin',
          deleted: 0,
          active: 1
        }
      })

      if(existSuperAdmin) {
        return res.status(405).json({
          status: 0,
          message: 'Method not Allowed'
        })
      }

      const user = await User.findOne({
        where: {
          email,
          active: 1,
          deleted: 0,
        }
      })

      if(!user) {
        return res.status(404).json({
          status: 0,
          message: 'akun tidak ditemukan!'
        })
      }

      await user.update({ role: 'super-admin' })

      return res.status(201).json({
        status: 1,
        message: 'sukses'
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
  getCustomer,
  resetPassword,
  getMemberAdmin,
  createMemberAdmin,
  removeMemberAdmin,
  createSuperAdmin,
}