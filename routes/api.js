const router = require('express').Router();
const db = require('../bin/db');
const sqlMap = require('../bin/sqlMap');
const common = require('../bin/common');

// 开放测试数据
router.get('/', (req, res, next) => {
  db.query(sqlMap.all,(err, data) => {
      if (err) {
        common.json(res, -1, "500 - Server Error", []);
      } else {
        common.json(res, 1, "请求成功", data);
      }
    });
});

// 处理注册
router.post('/user/register',
  function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    if (username == '' || password == '') {
      common.json(res, 3, "用户名或密码不能为空", []);
      return;
    } else if (username.length < 6 || password.length < 6) {
      common.json(res, 4, "用户名或密码不能小于6位", []);
      return;
    }

    db.query(sqlMap.user.register.occupied, [username],
      (err, data) => {
        // console.log(data);
        if (err) {
          common.json(res, -1, "500 - Server Error", []);
        } else if (data.length > 0) {
          common.json(res, 1, "用户名被占用", data);
        } else {
          next();
        }
      });
  },
  function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    if (username == '' || password == '') {
      common.json(res, 3, "用户名或密码不能为空", []);
      return;
    } else if (username.length < 6 || password.length < 6) {
      common.json(res, 4, "用户名或密码不能小于6位", []);
      return;
    }

    db.query(sqlMap.user.register.success, [username, common.md5(password)],(err, data) => {
        // console.log(username, password);
        if (err) {
          common.json(res, -1, "500 - Server Error", []);
        } else {
          common.json(res, 0, "注册成功", [{
            "username": username
          }]);
        }
      });
  });

// 处理登录
router.post('/user/login',
  function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    if (username == '' || password == '') {
      common.json(res, 3, "用户名或密码不能为空", []);
      return;
    } else if (username.length < 6 || password.length < 6) {
      common.json(res, 4, "用户名或密码不能小于6位", []);
      return;
    }

    db.query(sqlMap.user.login.success, [username],(err, data) => {
        // console.log(data);
        // console.log(username, password);
        if (err) {
          res.status(500).send('500 - Server Error');
          return;
        }
        if (data.length == 0) {
          common.json(res, 1, "用户名不存在", []);
          return;
        }

        if (data[0].password != common.md5(password)) {
          common.json(res, 2, "用户名或密码错误", []);
        } else {
          common.json(res, 0, "登录成功", [{
            "id": data[0].id,
            "username": data[0].username
          }]);
        }
      });
  });

module.exports = router;
