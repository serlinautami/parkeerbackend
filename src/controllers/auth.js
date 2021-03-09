const bcrypt = require('bcrypt');
const { User } = require('../model');
const { generateRandomToken } = require('../helper');

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
    const userData = await User.findByEmail(email);

    if(!userData) {
      return res.status(404).json({
        status: 0,
        message: 'akun tidak ditemukan'
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
    User.updateAccessToken(userData.id, accessToken)

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

/**
 * @name registration
 * @description controller untuk registrasi
 */
const registration = async function(req, res) {
  const { name, email, password }  = req.body;

  // validasi kolom tidak diisi
  if(!name || !email || !password) {
    return res.status(400).json({
      status: 0,
      message: 'kolom, nama, email, dan password harus diisi!'
    })
  }

  // validasi password harus minimal 8 karakter
  if(password && password.length < 8) {
    return res.status(400).json({
      status: 0,
      message: 'panjang password minimal 8 karakter'
    })
  }

  try {
    
    // cek user sudah ada sebelumnya yang terdaftar
    const existUser = await User.findByEmail(email);

    if(existUser) {
      return res.status(400).json({
        status: 0,
        message: 'akun dengan email ini sudah terdaftar'
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // membuat data user dan simpan ke database
    await User.create({ 
      name, 
      email,
      password: hashedPassword 
    });
    
    return res.status(200).json({
      status: 1,
      code: 201,
      message: 'registrasi berhasil'
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      code: 500,
      message: 'Server Error'
    });
  }
}

module.exports = {
  login,
  registration
}