var express = require('express');
var router = express.Router();

var pathName = "/root/info";

const fs = require('fs');
var path = require("path");
var async = require("async");
var cp = require('child_process');
const test = new (require(path.join(__dirname, '../public/build/releasejscallc/ttt_proxy')))();
var new_c = require('../public/build/new');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readdir(pathName, function(err, files){
    var dirs = [];
    (function iterator(i){
      if(i == files.length) {
        console.log(dirs);
        res.render('index', { inf: dirs });
        return ;
      }
      fs.stat(path.join(pathName, files[i]), function(err, data){
        if (data.isDirectory()) {
          // var obj = new Object();
          // obj.name = files[i];//文件名
          var pathname = pathName+'/'+files[i]+'/config.json';
          var inf = JSON.parse(fs.readFileSync(pathname));
          // console.log(inf);
          dirs.push(inf);
        }
        // console.log(dirs);
        iterator(i+1);
      });
    })(0);
    // console.log(dirs);
  });
  // res.render('index', { inf: 'Express' });
});
router.get('/diaodu1', function(req, res, next) {
  res.render('diaodu');
});
router.get('/diaodu2', function(req, res, next) {
  new_c.new_containers2(
      '-d',
      'redis',
      'redis1',
      'usr/local/bin/redis-server',
  );
  res.render('diaodu2');
});

router.get('/redis0', function(req, res, next) {
  res.render('redis0');
});
router.get('/redis1', function(req, res, next) {
  res.render('redis1');
});
router.get('/flask1', function(req, res, next) {
  res.render('flask1');
});
router.get('/flask2', function(req, res, next) {
  res.render('flask2');
});
router.get('/docker-container', function(req, res, next) {
  res.render('docker-container',{pid:18802});
});
router.get('/docker-container1', function(req, res, next) {
  res.render('docker-container1',{pid:18807});
});
router.get('/new-images', function(req, res, next) {
  res.render('new-images');
});
router.get('/temperature', function(req, res, next) {
  res.render('temperature');
});
router.get('/Sun', function(req, res, next) {
  res.render('Sun');
});

router.post('/cpu',function(req,res,next){
  console.log(req.body.pid);
  var cpu = 0;
  var ram = 0;
  async.series([
    function (callback) {
      // console.log("1");
      test.get_proc_cpu({
        pid:5227
      }, (rsp) => {
        console.log('cpu : ', rsp);

        cpu = rsp.pcpu.toFixed(2);
        callback(null,'1success');
      });
      // callback(null);
    },
    function (callback) {
      // console.log("2");
      test.get_proc_mem({
        pid: 5227
      }, (rsp) => {
        console.log('mem : ', rsp);
        ram = rsp.pmem.toFixed(2);
        callback(null,'2success');
      });
      // callback(null);
    },
    function (callback) {
      // console.log("3");
      console.log("cpu:"+ cpu);
      console.log("ram:"+ ram);
      res.json({//给前端返回json格式的数据
        code: 0,
        cpu: cpu,
        ram: ram
      });
      callback(null,'3success');
    },
  ], function (err, result) {
    if (!err)
      console.log(result);
    else
      console.log(err);
  });
});

module.exports = router;
