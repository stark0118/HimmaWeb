var express = require('express');
var router = express.Router();
const fs = require('fs');
var path = require("path");
var async = require("async");
var cp = require('child_process');
const test = new (require(path.join(__dirname, '../public/build/releasejscallc/ttt_proxy')))();
var pathName2 = '/root/info';

/* GET home page. */
router.get('/', function(req, res, next) {
    fs.readdir(pathName2, function(err, files){
        var containers = [];
        (function iterator(i){
            if(i == files.length) {
                console.log(containers);
                res.render('container-list',
                    {
                        containers: containers,
                        // images:dirs,
                        // scheduling_num:scheduling_num
                    });
                return ;
            }
            fs.stat(path.join(pathName2, files[i]), function(err, data){
                if (data.isDirectory()) {
                    // var obj = new Object();
                    // obj.name = files[i];//文件名
                    var pathname2 = pathName2+'/'+files[i]+'/config.json';
                    var inf = JSON.parse(fs.readFileSync(pathname2));
                    // console.log(inf);
                    containers.push(inf);
                }
                // console.log(dirs);
                iterator(i+1);
            });
        })(0);
        // console.log(dirs);
    });
    // res.render('container-list', {containers: containers});
});

router.get('/start/:id', function (req, res, next) {
    console.log(req.params.id);
    res.redirect('/container-list');
});

router.get('/stop/:id', function (req, res, next) {
    // console.log(req.params.id);
    cmd = "himma " + "stop" + req.params.id ;
    cp.exec(cmd, function (err) {
        if (err) {
            console.log(err);
        } else if (err == null) {
            console.log(null, 'success');
        }
    });
    res.redirect('/container-list');
});

router.get('/remove/:id', function (req, res, next) {
    cmd = "himma " + "rm " + req.params.id ;
    cp.exec(cmd, function (err) {
        if (err) {
            console.log(err);
        } else if (err == null) {
            console.log(null, 'success');
        }
    });
    res.redirect('/container-list');
});

module.exports = router;