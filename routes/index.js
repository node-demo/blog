var express = require('express');
var router = express.Router();
var db = require('../bin/db');
var json = {};

function sidebar(req, res, next) {
  db.query('SELECT cate_Name As name,cate_Count As count FROM zbp_category', (err, results) => {
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
  db.query('SELECT log_ID AS id,log_Title AS title,log_Intro As info FROM zbp_post WHERE log_ID!=2', (err, results) => {
    if (err) {
      res.status(500).render('error.htm');
    } else {
      json['results'] = results;
      res.render('index.htm', json);
      // console.log(json);
    }
  });
});

module.exports = router;
