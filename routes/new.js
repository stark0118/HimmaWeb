var express = require('express');
var router = express.Router();

const fs = require('fs');
var path = require("path");
var dirs = [];      //读取到的目录文件列表

var new_c = require('../public/build/new');



/* GET home page. */
router.get('/', function(req, res, next) {
    // const containers = JSON.parse(fs.readFileSync(path.join(__dirname, "../public/build/demo.json")))//读
    // console.log(containers);
    res.render('new', { images: dirs });
});

router.post('/create', function (req, res, next) {
    console.log(req.body);
    if(req.body.containerPortSource ==""){
        console.log("new_containers2");
        new_c.new_containers2(
            req.body.containerchoice,
            req.body.containerImage,
            req.body.containername,
            req.body.containerCmd,
        );
    }
    else {
        console.log("new_containers1");
        new_c.new_containers1(req.body.containerchoice,
            req.body.containerImage,
            req.body.containername,
            req.body.containerCmd,
            req.body.containerPortSource,
            req.body.containerPortDistination);
    }
    res.redirect('/new');
});

module.exports = router;