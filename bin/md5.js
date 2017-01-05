const crypto = require('crypto');

module.exports = function(str) {
  const obj = crypto.createHash('md5');
  obj.update(str);
  return obj.digest('hex');
}
