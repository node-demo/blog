var express = require('express');
var router = express.Router();
var db = require('../bin/db');

var jsonWrite = function (res, ret) {
    if(!ret.length) {
        res.json({
            code:404,
            msg:'操作失败'
        });
    } else {
        res.json({
          code:200,
          msg:'操作成功',
          data:ret
        });
    }
};

router.get('/', (req, res, next)=>{
  db.query('SELECT log_PostTime,log_Title,log_Intro,log_Content FROM zbp_post',
    (err, data) => {
    if (err) {
      res.status(500).render('error.htm');
    } else {
      jsonWrite(res, data);
    }
  });
});

module.exports = router;