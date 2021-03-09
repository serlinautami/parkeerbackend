/**
 * @name authMiddleware
 * @description middleware untuk memeriksa otentikasi melalui bearer token
 */
const authMiddleware = function(req, res, next) {
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

  // passed
  next();
}

module.exports = {
  authMiddleware
}