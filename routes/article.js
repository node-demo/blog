var express = require('express');
var router = express.Router();
var db = require('../bin/db');
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

router.get('/:id', (req, res, next)=>{
  sidebar(req, res, next)
}, (req, res, next) => {
  db.query('SELECT log_ID AS id,log_Title As title,log_Intro As content FROM zbp_post WHERE log_ID=?', [req.params.id], (err, results, next) => {
    if (err) {
      res.status(500).render('error.htm');
    } else {
      json['results'] = results[0];
      res.render('article.htm', json);
      // console.log(json);
    }
  });
});

module.exports = router;
