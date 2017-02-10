const router = require('express').Router();
const db = require('../bin/db');
const sqlMap = require('../bin/sqlMap');
const common = require('../bin/common');
const sidebar = require('./sidebar');

var json = {
  count: [],
  total: 1
};

// get
router.get('/:id',sidebar,(req, res, next) => {
  db.query(sqlMap.article.json, [req.params.id], (err, results, next) => {
    if (err) {
      res.status(500).send('500 - Server Error');;
    } else {
      json['results'] = results[0];
      res.render('article.htm', json);
    }
  });
});

module.exports = router;
