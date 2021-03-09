const bcrypt = require('bcrypt');
const uuid4 = require('uuid4');

/**
 * @name generateRandomToken
 * @description untuk menggenerate token secara acak
 */
const generateRandomToken = async function() {
  const generateId = uuid4();
  const hashedId = await bcrypt.hash(generateId, 10)
  return hashedId;
}

/**
 * @name generateRandomId
 * @description untuk menggenerate id secara acak
 */
const generateRandomId = () => {
  const generateId = uuid4();
  return generateId;
}


module.exports = {
  generateRandomId,
  generateRandomToken
}