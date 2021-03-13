const bcrypt = require('bcrypt');
const { User } = require('../../model');
const jwt = require('jsonwebtoken');
const { appConfig } = require('../../configs');

/**
 * @name login
 * @description controller untuk login
 */
const login = async function(req, res) {

  const { email, password } = req.body

  // validasi jika kolom kosong
  if(!email || !password) {
    return res.status(400).json({
      status: 0,
      message: 'kolom email dan password harus diisi!'
    })
  }
  
  try {
    const userData = await User.findOne({
      where: { email, deleted: 0 }
    })

    if(!userData) {
      return res.status(404).json({
        status: 0,
        message: 'akun tidak ditemukan'
      }); 
    }

    if(userData.role !== 'admin' && userData.role !== 'super-admin') {
      return res.status(403).json({
        status: 0,
        message: 'Akses ditolak'
      });
    }

    // untuk menyocokan password yang di input dengan yang ada di database
    const isMatch = await bcrypt.compare(password, userData.password);

    // validasi salah password
    if(!isMatch) {
      return res.status(400).json({
        status: 0,
        message: 'email/password salah'
      }); 
    }

    // encrypt dengan JWT
    const accessToken = jwt.sign({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      photo: userData.photo,
      dob: userData.dob,
      role: userData.role
    }, appConfig.passphase, { expiresIn: 60 * 60 * 12 });

    await userData.update({
      access_token: accessToken
    })

    // update token ke database
    await userData.update({ access_token: accessToken });

    return res.status(200).json({
      status: 1,
      message: 'sukses',
      data: { access_token: accessToken }
    });
  } catch (err) {
    console.log('err', err);
    res.status(500).json({
      status: 0,
      message: 'server error'
    });
  }
}

module.exports = {
  login
}