const db = require('../bin/db');
const sqlMap = require('../bin/sqlMap');

module.exports = function(req, res, next) {
  db.query(sqlMap.sidebar, (err, data) => {
    if (err) {
      res.status(500).send('500 - Server Error');
    } else {
      if(!res.locals.count) res.locals.count={};
      res.locals.count=data;
      // console.log(data);
      next();
    }
  });
};