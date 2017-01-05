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
  },
  json(res, code, msg, data) {
    /*
    code:0,登录成功
    code:1,用户名不存在
    code:2,用户名或密码错误（密码错误）！
    code:3,用户名或密码不能为空
    code:4,用户名或密码不能小于6位
    code:5
    */
    if (!data.length) {
      res.json({
        "code": code,
        "msg": msg,
        "data": data
      });
    } else {
      res.json({
        "code": code,
        "msg": msg,
        "data": data
      });
    }
  }
};