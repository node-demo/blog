const express = require('express');
const router = express.Router();
const common = require('../bin/common');
const db = require('../bin/db');
var json = {};

function sidebar(req, res, next) {
  db.query('SELECT cate_ID As id,cate_Name As name,cate_Count As count FROM zbp_category', (err, results) => {
    if (err) {
      res.status(500).send('500 - Server Error');;
    } else {
      json['count'] = results;
    }
  });
  next();
}

router.get('/:id', (req, res, next) => {
  sidebar(req, res, next)
}, (req, res, next) => {
  db.query('SELECT log_ID AS id,log_Title As title,log_Content As content FROM zbp_post WHERE log_ID=?', [req.params.id], (err, results, next) => {
    if (err) {
      res.status(500).send('500 - Server Error');;
    } else {
      json['results'] = results[0];
      res.render('article.htm', json);
    }
  });
});

module.exports = router;
