var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    var request = require('request');

    request('http://blog.totter.cn/?json=1&count=5&page=1', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.render('index', {arr:JSON.parse(body).posts});
      }
    });

});

module.exports = router;