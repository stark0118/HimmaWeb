var express = require('express');
var router = express.Router();
const inf =[];
var path = require("path");
var readline = require('readline');
var fs = require('fs');
var os = require('os');
var read = require('../public/build/read');
var async = require("async");
var log;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('logs', { images: inf });
});

router.post('/get', function (req, res, next) {
    console.log(req.body);
    // fs.readFile(path.join(__dirname, "../public/build/container.txt"),'utf-8',function(err,data){
    //     if(err){
    //         console.error(err);
    //     }
    //     else{
    //         console.log(data);
    //     }
    // });
    const infs = fs.readFileSync(path.join(__dirname, "../public/build/container.txt"));
    console.log(infs);
    // log = read.readinf();

    res.json({//给前端返回json格式的数据
        log:infs
    });
});

module.exports = router;