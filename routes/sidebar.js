const db = require('../bin/db');

module.exports = function(req, res, next) {
  db.query('SELECT cate_ID As id,cate_Name As name,cate_Count As count FROM zbp_category', (err, results) => {
    if (err) {
      res.status(500).send('500 - Server Error');
    } else {
      console.log(results);
    }
  });
  next();
};