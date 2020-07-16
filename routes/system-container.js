var express = require('express');
var router = express.Router();
const os = require('os');
var osUtils = require("os-utils");
const inf = [];

/* GET home page. */
router.get('/', function(req, res, next) {
    // inf.cpu = os.loadavg();
    // inf.cpu = inf.cpu[2].toFixed(2)*100;
    // inf.ram = ((os.totalmem()/1024/1024/1024).toFixed(1)/8).toFixed(2)*100;
    // console.log(inf);
    res.render('system-container');
});

router.post('/sys',function(req,res,next){
    var freeMem = os.freemem()/1024/1024/1024;
    var totalMem = os.totalmem()/1024/1024/1024;
    osUtils.cpuUsage(function (value) {
        inf.cpu = ( value.toFixed(2) * 100.0 );
    });
    inf.ram = ((totalMem - freeMem)/totalMem).toFixed(2) * 100.0;
    console.log(inf);
    if(inf.cpu<100 && inf.ram<100){
        res.json({//给前端返回json格式的数据
            cpu: inf.cpu,
            ram: inf.ram
        });
    }
    // else console.log('error');
});

module.exports = router;