var express = require('express');
var router = express.Router();
var db = require('../bin/db');
var md5 = require('../bin/md5');
var json = {};
function sidebar(req, res, next) {
  db.query('SELECT cate_ID As id,cate_Name As name,cate_Count As count FROM zbp_category', (err, results) => {
    if (err) {
      res.status(500).render('error.htm');
    } else {
      json['count'] = results;
      // res.render('article.htm', json);
    }
  });
  next();
}

router.get('/', (req, res, next)=>{
  sidebar(req, res, next)
}, (req, res, next) => {
  res.render('admin.htm', json);
});

router.post('/', (req, res, next)=>{
  sidebar(req, res, next)
}, (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  db.query('SELECT mem_ID AS id,mem_Name AS username,mem_Password AS password FROM zbp_member WHERE mem_Name=?',[username],(err, results)=>{
    if(err){
      res.status(500).render('error.htm');
    }else{
      // console.log(username,password);
      if(results.length == 0){
        res.status(400).send('The user does not exist');
      }else{
        // console.log(results);
        if(results[0].password==md5(password)){
          //登录成功
          req.session['admin_id']=results[0].id;
          res.redirect('/admin');
        }else{
          //登录失败
          res.status(400).send('this password is incorrect');
        }
      }
    }
  });
});
module.exports = router;