var express = require('express');
var router = express.Router();
const fs = require('fs');
var path = require("path");
var pathName = '/root/images';
var dirs = [];

fs.readdir(pathName, function(err, files){
    (function iterator(i){
        if(i == files.length) {
            // console.log(dirs);
            return ;
        }
        fs.stat(path.join(pathName, files[i]), function(err, data){
            if (data.isFile()) {
                // console.log(data.size);
                var obj = new Object();
                obj.size = (data.size/1000000).toFixed(2);//文件大小，以字节为单位
                obj.name = files[i];//文件名
                // console.log(data);
                dirs.push(obj);
            }
            iterator(i+1);
        });
    })(0);
    // console.log(dirs);
});
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('image-list', { images: dirs });
});

module.exports = router;