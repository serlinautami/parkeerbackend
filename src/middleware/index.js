const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User } = require('../model');
const { appConfig } = require('../configs');

/**
 * @name customerAuthMiddleware
 * @description middleware untuk memeriksa otentikasi melalui bearer token
 */
const customerAuthMiddleware = async function(req, res, next) {
  let bearer;
  let authorization;
  
  authorization = req.header('authorization');

  if(authorization) {
    bearer = authorization.split(' ')[1];
  }

  // membutuhkan otentikasi
  if(!authorization || !bearer) {
    res.status(403).json({
      status: 0,
      message: 'Akses ditolak!'
    })
  }




  try {

    jwt.verify(bearer, appConfig.passphase);
    const userData = await User.findOne({ 
      where: { 
        access_token: bearer,
        deleted: 0,
        role: 'customer'
      } 
    });

    if(!userData) {
      return res.status(403).json({
        status: 0,
        message: 'Akses ditolak!'
      })  
    }

    if(!userData.active) {
      return res.status(403).json({
        status: 0,
        message: 'Akun ini sudah dinonaktifkan!, jika tidak merasa menonaktifkannya hubungi tim support!'
      })
    }

    req.accessToken = bearer;
    req.role = userData.role;

    // passed
    return next();
  } catch (err) {

    if(err && err.name && (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError')) {
      return res.status(401).json({
        status: 0,
        message: 'Sesi berakhir! silahkan login kembali!',
      })
    }

    return res.status(500).json({
      status: 0,
      message: 'server error!',
      error: err
    })
  }
}

/**
 * @name adminAuthMiddleware
 * @description middleware untuk memeriksa otentikasi melalui bearer token
 */
const adminAuthMiddleware = async function(req, res, next) {
  let bearer;
  let authorization;
  
  authorization = req.header('authorization');

  if(authorization) {
    bearer = authorization.split(' ')[1];
  }

  // membutuhkan otentikasi
  if(!authorization || !bearer) {
    res.status(403).json({
      status: 0,
      message: 'Akses ditolak!'
    })
  }


  try {
    jwt.verify(bearer, appConfig.passphase);
    const userData = await User.findOne({ 
      where: { 
        access_token: bearer,
        deleted: 0,
        [Op.or]: [
          {role: 'admin'},
          {role: 'super-admin'}
        ]
      } 
    });
    if(!userData) {
      return res.status(500).json({
        status: 0,
        message: 'Akses ditolak!'
      })  
    }

    if(!userData.active) {
      return res.status(403).json({
        status: 0,
        message: 'Akun ini sudah dinonaktifkan, jika tidak merasa menonaktifkannya hubungi tim support!'
      })
    }

    req.accessToken = bearer;
    req.role = userData.role;

    // passed
    return next();
  } catch (err) {

    if(err && err.name && (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError')) {
      return res.status(401).json({
        status: 0,
        message: 'Sesi berakhir! silahkan login kembali!',
      })
    }
    return res.status(500).json({
      status: 0,
      message: 'server error!',
    })
  }
}


/**
 * @name superAdminAuthMiddleware
 * @description middleware untuk memeriksa otentikasi melalui bearer token
 */
 const superAdminAuthMiddleware = async function(req, res, next) {
  let bearer;
  let authorization;
  
  authorization = req.header('authorization');

  if(authorization) {
    bearer = authorization.split(' ')[1];
  }

  // membutuhkan otentikasi
  if(!authorization || !bearer) {
    res.status(403).json({
      status: 0,
      code: 403,
      message: 'Akses ditolak!'
    })
  }


  try {

    jwt.verify(bearer, appConfig.passphase);
    const userData = await User.findOne({ 
      where: { 
        access_token: bearer, 
        deleted: 0, 
        role: 'super-admin' 
      } 
    });


    if(!userData) {
      return res.status(403).json({
        status: 0,
        message: 'Akses ditolak!'
      })  
    }


    if(!userData.active) {
      return res.status(403).json({
        status: 0,
        message: 'Akun ini sudah dinonaktifkan, jika tidak merasa menonaktifkannya hubungi tim support!'
      })
    }

    req.accessToken = bearer;
    req.role = userData.role;

    // passed
    return next();
  } catch (err) {

    if(err && err.name && (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError')) {
      return res.status(401).json({
        status: 0,
        message: 'Sesi berakhir! silahkan login kembali!',
      })
    }
    return res.status(500).json({
      status: 0,
      message: 'server error!',
    })
  }
}

module.exports = {
  adminAuthMiddleware,
  customerAuthMiddleware,
  superAdminAuthMiddleware
}