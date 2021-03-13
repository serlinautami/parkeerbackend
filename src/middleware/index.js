const { User } = require('../model');

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
      code: 403,
      message: 'Akses ditolak!'
    })
  }

  req.accessToken = bearer;


  try {
    const userData = await User.findByAccessToken(bearer);

    if(!userData || userData.role !== 'customer') {
      return res.status(500).json({
        status: 0,
        message: 'Akses ditolak!'
      })  
    }

    // passed
    return next();
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: 'server error!'
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
      code: 403,
      message: 'Akses ditolak!'
    })
  }

  req.accessToken = bearer;


  try {
    const userData = await User.findByAccessToken(bearer);
    if(!userData || userData.role !== 'admin' && userData.role !== 'super-admin') {
      return res.status(500).json({
        status: 0,
        message: 'Akses ditolak!'
      })  
    }

    // passed
    return next();
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: 'server error!'
    })
  }
}

module.exports = {
  adminAuthMiddleware,
  customerAuthMiddleware
}