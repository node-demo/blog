const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const multer = require('multer');
const ejs = require('ejs');

// 实例化express
const app = express();

// 监听端口
app.set('port', process.env.PORT || 18080);

// 启动监听
var server = app.listen(app.get('port'), () => {
  console.log(server.address().port);
});

// 配置模板引擎
app.engine('htm', ejs.__express);
app.set('view engine', 'htm');
app.set('views', './views');

// 1.处理cookie
app.use(cookieParser('identification'));

// 2.处理session
app.use(cookieSession({
  name: 'sess_id',
  keys: ['xx', 'xxx'],
  maxAge: 20 * 3600 * 1000
}));

// 3.处理post
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: './www/upload' }).any());

// 4.处理get
app.use('/api', require('./routes/api'));
app.use('/article', require('./routes/article'));
app.use('/list', require('./routes/list'));
app.use('/admin', require('./routes/admin'));
app.use('/', require('./routes/index'));

// 静态文件
app.use(express.static('./www'));

// 定制404页面
app.get('*', (req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - No Found');
});

// 定制500页面
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
});

// module.exports = app;
