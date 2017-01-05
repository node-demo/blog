const router = require('express').Router();
const common = require('../bin/common');
const db = require('../bin/db');

// 检查登录状态(中间件)
router.use((req, res, next) => {
  if (!req.session.admin_id && req.url != '/login'){
    // console.log(req.url);
    // 登录成功：req.session.admin_id会被复赋值！
    // 否则视为：没登录！
    res.redirect('/admin/login');
  }else{
    next(); //已登陆
  }
});

// 用户模块
router.use('/', require('./admin.user'));

// 文章模块
// router.use('/article',require('./admin.article'));

// 分类模块
// router.use('/type',require('./admin.type'));

router.get('/', (req, res, next) => {
  res.send('登录成功');
});

module.exports = router;
