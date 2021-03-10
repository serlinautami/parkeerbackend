const { User } = require('../../model');

const get = async function(req, res) {
  const accessToken = req.accessToken;

  try {
    const user = await User.findByAccessToken(accessToken);
    if(!user) {
      return res.status(404).json({
        status: 0,
        message: 'data user tidak ditemukan'
      })
    }

    return res.status(200).json({
      status: 0,
      message: 'success',
      data: user
    })
  } catch (err) {
    console.log('err', err)
    return res.status(500).json({
      status: 0,
      message: 'server error'
    })
  }

};
const update = function(req, res) {};

module.exports = {
  get,
  update
}