var express = require('express');
var router = express.Router();
var db = require('../bin/db');
var md5 = require('../bin/md5');

router.post('/', (req, res, next) => {

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

      // console.log(username,password);
      if (data.length == 0) {
        res.status(400).send('The user does not exist');
        return;
      }

      // console.log(data);
      if (data[0].password == md5(password)) {
        //登录成功
        req.session['admin_id'] = data[0].id;
        res.redirect('/admin');
      } else {
        //登录失败
        res.status(400).send('this password is incorrect');
      }
    });
});
module.exports = router;
