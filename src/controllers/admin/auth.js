const bcrypt = require('bcrypt');
const { User } = require('../../model');
const { generateRandomToken } = require('../../helper');

/**
 * @name login
 * @description controller untuk login
 */
const login = async function(req, res) {
  console.log('req.body', req.body)

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
      where: { email }
    })

    console.log('userData', userData)

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

    const accessToken = await generateRandomToken();

    // update token ke database
    User.update({ access_token: accessToken }, {
      where: {
        id: userData.id 
      }
    })

    return res.status(200).json({
      status: 1,
      message: 'sukses',
      data: { accessToken }
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