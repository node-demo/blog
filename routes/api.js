const express = require('express');
const router = express.Router();
const common = require('../bin/common');
const db = require('../bin/db');

const jsonWrite = function (res, ret) {
    if(!ret.length) {
        res.json({
            code:404,
            msg:'操作失败'
        });
    } else {
        res.json({
          code:200,
          msg:'操作成功',
          data:ret
        });
    }
};

router.get('/', (req, res, next)=>{
  db.query('SELECT log_PostTime,log_Title,log_Intro,log_Content FROM zbp_post',
    (err, data) => {
    if (err) {
      res.status(500).render('error.htm');
    } else {
      jsonWrite(res, data);
    }
  });
});

router.post('/user/login', (req, res, next) => {

  var username = req.body.username;
  var password = req.body.password;

  db.query(`SELECT mem_ID AS id,mem_Name AS username,mem_Password AS password \
    FROM zbp_member \
    WHERE mem_Name=?`, [username],
    (err, data) => {
      if (err) {
        res.status(500).send('500 - Server Error');
        return;
      }

      // console.log(data);
      // console.log(username,password);

      if (data.length == 0) {
        // 用户名不存在
        jsonWrite(res, data);
        return;
      }

      if (data[0].password == md5(password)) {
        //登录成功
        jsonWrite(res, data);
      } else {
        //登录失败
        res.status(400).send('this password is incorrect');
      }
    });
});
module.exports = router;