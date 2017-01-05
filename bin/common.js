const crypto = require('crypto');

module.exports = {
  md5(str) {
    const obj = crypto.createHash('md5');
    obj.update(str);
    return obj.digest('hex');
  },
  time(time) {
    if (time > 0) {
      var dateStr = new Date(time * 1000);
      return dateStr.getFullYear() + '-' + dateStr.getMonth() + 1 + '-' + dateStr.getDate() + ' ' + dateStr.getHours() + ':' + dateStr.getMinutes() + ':' + dateStr.getSeconds();
    } else {
      return '末知时间';
    }
  }
};
