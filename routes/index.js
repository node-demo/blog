const express = require('express');
const router = express.Router();
const db = require('../bin/db');
const json = {};

const page = {
    now: 1,
    item: 5,
    start: 0,
    total: 1,
    aaa: 1
};

router.get('/', (req, res, next) => {
    db.query('SELECT cate_ID As id,cate_Name As name,cate_Count As count FROM zbp_category', (err, data) => {
        if (err) {
            res.status(500).render('error.htm');
        } else {
            json['count'] = data;
        }
    });
    next();
}, (req, res, next) => {
    db.query('SELECT count(log_ID) As count FROM zbp_post', (err, data) => {
        if (err) {
            res.status(500).send('page.total error');
            console.log('page.total error');
        } else {
            page['total'] = Math.ceil(data[0].count / page.item); //总页数
            console.log(page.total);
        }
    });
    next();
}, (req, res) => {
    //当前页
    page.now = req.query.p || 1;
    if (req.query.p <= 0) { page.now = 1; }
    if (req.query.p >= page.total) { page.now = page.total; }

    //当前页起始ID
    page.start = (page.now - 1) * page.item;

    db.query(`SELECT log_ID AS id,log_Title AS title,log_Intro As info \
        FROM zbp_post \
        WHERE log_ID!=2 LIMIT ?,?`, [page.start, page.item],
        (err, data) => {
            if (err) {
                res.status(500).render('error.htm');
            } else {
                json['total'] = page.total;
                json['now'] = page.now;
                json['results'] = data;
                res.render('index.htm', json);
            }
        });
});

module.exports = router;