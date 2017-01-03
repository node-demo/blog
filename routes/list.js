var express = require('express');
var router = express.Router();
var db = require('../bin/db');
var json = {};

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
            res.status(500).render('error.htm');
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
            console.log('page.total error');
        } else {
            page.total = Math.ceil(data[0].count / page.item); //总页数
            console.log(page.total);
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
                res.status(500).render('error.htm');
            } else {
                json['total'] = page.total;
                json['now'] = page.now;
                json['id'] = typeId;
                json['results'] = data;
                res.render('list.htm', json);
            }
        });
});

module.exports = router;