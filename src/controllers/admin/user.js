const { User } = require('../../model');

const get = async function(req, res) {
  try {
    const data = await User.get({ role: 'customer' });
    
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
const update = function(req, res) {};

module.exports = {
  get,
  update
}