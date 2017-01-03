const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const multer = require('multer');
const ejs = require('ejs');

// 实例化express
const app = express();

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
app.use('/admin', require('./routes/admin'));
app.use('/list', require('./routes/list'));
app.use('/', require('./routes/index'));

// 静态文件
app.use(express.static('./www'));

// 404
app.get('*', function(req, res){
    res.render('404.htm', {
        title: '404 No Found'
    })
});

// 错误处理
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render('error.htm', { error: err });
});

// 监听端口
app.listen(18080);

// module.exports = app;