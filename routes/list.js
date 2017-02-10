const router = require('express').Router();
const db = require('../bin/db');
const sqlMap = require('../bin/sqlMap');
const common = require('../bin/common');
const sidebar = require('./sidebar');

var json = {
  count: [],
  total: 1
};

var page = {
  now: 1,
  item: 5,
  start: 0,
  total: 1
};

// get
router.get('/:id',sidebar,
  function (req, res, next) {
    db.query(sqlMap.list.total, [req.params.id], (err, data) => {
      if (err) {
        res.status(500).send('page.total error');
      } else {
        page.total = Math.ceil(data[0].count / page.item); //总页数
        next();
      }
    });
  },
  function (req, res) {
    //当前页
    typeId = req.params.id || 1;
    page.now = req.query.p || 1;
    if (req.query.p <= 0) {
      page.now = 1;
    }
    if (req.query.p >= page.total) {
      page.now = page.total;
    }

    //当前页起始ID
    page.start = (page.now - 1) * page.item;

    db.query(sqlMap.list.json, [typeId, page.start, page.item],
      (err, data) => {
        if (err) {
          res.status(500).send('500 - Server Error');
        } else {
          json['total'] = page.total;
          json['now'] = page.now;
          json['id'] = typeId;
          json['count'] = res.locals.count;
          json['results'] = data;
          res.render('list.htm', json);
        }
      });
  }
);

module.exports = router;