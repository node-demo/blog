const router = require('express').Router();
const db = require('../bin/db');
const sqlApi = require('../bin/sqlApi');
const common = require('../bin/common');

// 检查登录状态(授权)
function authorize(req, res, next){
  // if(req.session.authorized) return next();
  if(!req.session.authorized) return next();
  res.send('not-authorized');
}

//get
router.get('/', authorize, function(req, res, next) {
  res.send('/admin');
});
router.get('/login', authorize, function(req, res, next) {
  res.send('/admin/login');
});
router.get('/register', authorize, function(req, res, next) {
  res.send('/admin/register');
});

//post
router.post('/', function(req, res, next) {

    var username = req.body.username;
    var password = req.body.password;

    db.query(sqlApi.admin.login.success, [username],(err, data) => {
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
            if (data[0].password == common.md5(password)) {
                //登录成功
                req.session['admin_id'] = data[0].id;
                res.redirect('/admin');
            } else {
                //登录失败
                res.status(400).send('this password is incorrect');
            }
        });
});

router.post('/login', authorize, function(req, res, next) {
  res.send('/admin/login');
});
router.post('/register', authorize, function(req, res, next) {
  res.send('/admin/register');
});

module.exports = router;
