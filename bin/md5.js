module.exports = function(str) {
  const crypto = require('crypto');
  const cryptoObj = crypto.createHash('md5');
  cryptoObj.update(str);
  return cryptoObj.digest('hex');
}
