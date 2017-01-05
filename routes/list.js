const express = require('express');
const router = express.Router();
const db = require('../bin/db');
const md5 = require('../bin/md5');
const json = {
  count:1,
  total:1
};

const page = {
  now: 1,
  item: 5,
  start: 0,
  total: 1,
  aaa: 1
};

function sidebar(req, res, next) {
  db.query('SELECT cate_ID As id,cate_Name As name,cate_Count As count FROM zbp_category', (err, results) => {
    if (err) {
      res.status(500).send('500 - Server Error');
    } else {
      json['count'] = results;
    }
  });
  next();
}

router.get('/:id', (req, res, next) => {
  sidebar(req, res, next)
}, (req, res, next) => {
  db.query('SELECT count(log_ID) As count FROM zbp_post WHERE log_CateID=?', [req.params.id], (err, data) => {
    if (err) {
      res.status(500).send('page.total error');
    } else {
      page.total = Math.ceil(data[0].count / page.item); //总页数
    }
  });
  next();
}, (req, res) => {
  //当前页
  typeId = req.params.id || 1;
  page.now = req.query.p || 1;
  if (req.query.p <= 0) { page.now = 1; }
  if (req.query.p >= page.total) { page.now = page.total; }

  //当前页起始ID
  page.start = (page.now - 1) * page.item;

  db.query(`SELECT log_ID AS id,log_Title AS title,log_Intro As info \
    FROM zbp_post \
    WHERE log_ID!=2 AND log_CateID=?  LIMIT ?,?`, [typeId, page.start, page.item],
    (err, data) => {
      if (err) {
        res.status(500).send('500 - Server Error');
      } else {
        json['total'] = page.total;
        json['now'] = page.now;
        json['id'] = typeId;
        json['results'] = data;
        res.render('list.htm', json);
      }
    });
});

router.post('/', (req, res, next) => {
  db.query('SELECT cate_ID As id,cate_Name As name,cate_Count As count FROM zbp_category', (err, results) => {
    if (err) {
      res.status(500).send('500 - Server Error');;
    } else {
      json['count'] = results;
    }
  });
  next();
}, (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(`SELECT mem_ID AS id,mem_Name AS username,mem_Password AS password \
    FROM zbp_member \
    WHERE mem_Name=?`, [username],
    (err, results) => {
      if (err) {
        res.status(500).send('500 - Server Error');
        return;
      }

      // console.log(username,password);
      if (results.length == 0) {
        res.status(400).send('The user does not exist');
        return;
      }

      // console.log(results);
      if (results[0].password == md5(password)) {
        //登录成功
        req.session['admin_id'] = results[0].id;
        res.redirect('/admin');
      } else {
        //登录失败
        res.status(400).send('this password is incorrect');
      }
    });
});

module.exports = router;
