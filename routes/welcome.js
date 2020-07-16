var express = require('express');
var router = express.Router();
const os = require('os');
const inf =[];

var async = require("async");
const fs = require('fs');
var path = require("path");
var pathName = "/root/images";
var pathName2 = "/root/info";
var dirs = [];
var containers = [];

/* GET home page. */
router.get('/', function(req, res, next) {
    inf.platform = os.platform();
    inf.cpu = os.cpus().length;
    inf.hostname = os.hostname();
    inf.type = os.type();
    inf.uptime = os.uptime();
    inf.totalmem = (os.totalmem()/1024/1024/1024).toFixed(1)+'G';
    async.series([
        function (callback) {
            dirs = [];
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
                            obj.size = data.size;//文件大小，以字节为单位
                            obj.name = files[i];//文件名
                            // console.log(data);

                            dirs.push(obj);
                        }
                        iterator(i+1);
                    });
                })(0);
            });
            callback(null, '1');
        },
        function (callback) {
            containers = [];
            fs.readdir(pathName2, function(err, files){
                containers = [];
                (function iterator(i){
                    if(i == files.length) {
                        // console.log(containers);
                        inf.images = dirs.length;
                        var running = 0;
                        var stopped = 0;
                        for (var p in containers) {//遍历json数组时，这么写p为索引，0,1
                            if(containers[p].status == "running"){
                                running++;
                            }
                            if(containers[p].status == "stopped"){
                                stopped++;
                            }
                        }
                        inf.running = running;
                        inf.stopped = stopped;
                        res.render('welcome',{
                            inf:inf
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
            callback(null, "2");
        },
    ], function (err, result) {
        if (!err)
            console.log(result);
        else
            console.log(err);
    });

});



module.exports = router;