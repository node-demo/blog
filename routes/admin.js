var express = require('express');
var router = express.Router();
var db = require('../bin/db');
var md5 = require('../bin/md5');

// 检查登录状态
router.use((req, res, next) => {
  if(!req.session['admin_id'] && req.url!='/login')
    res.redirect('/admin/login'); //没登录
  else
    next();                       //已登陆
});

// 登录模块
router.use('/login',require('./admin.login'));

// 用户模块
// router.use('/user',require('./admin.addUser'));
// router.use('/user',require('./admin.modUser'));

// 文章模块
// router.use('/article',require('./admin.addArticle'));
// router.use('/article',require('./admin.modArticle'));

// 分类模块
// router.use('/type',require('./admin.addType'));
// router.use('/type',require('./admin.modType'));

router.get('/', (req, res, next) => {
  res.send('登录成功');
});

module.exports = router;
