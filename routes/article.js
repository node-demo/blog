var express = require('express');
var request = require('request');
var router = express.Router();
var result={};

router.get('/:id', function(req, res, next) {
    //?json=get_post&post_id=1
    //?json=get_tag_posts&tag_slug=banana
    request('http://blog.totter.cn/?json=get_post&post_id='+req.params.id, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            result=JSON.parse(body);

            if(result.status=="ok" && result.next_url || result.previous_url){
                res.render('article', result.post);
            }else if(result.status=="error"){
                res.render('article', {id:null,title:"Not found",content:"Not found"});
            }else{
                res.render('article', {id:null,title:404,content:404});
            }
        }
    });
});

module.exports = router;