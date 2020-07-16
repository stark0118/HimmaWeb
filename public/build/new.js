//这是可以运行我们测试用的微服务的版本，是重点部分（此部分为有端口的，是运行flask1、2的）
var cp = require('child_process');
var async = require("async");

//这是可以运行我们测试用的微服务的版本，是重点部分（此部分为有端口的，是运行flask1、2的）
var path;
var method = "-d";
var containername = "flask2";
var ifport = "-p";
var hostport = "5002";
var containerport = "5000";
var imagename = "python2";
var inputcmd = "python /microservice/app-test.py";
var testbridge = "testbridge";
var myDate = new Date();

function new_containers1(method,imagename,containername,inputcmd,hostport,containerport) {
    async.series([
        function (callback) {
            console.log("network");
            cmd = "himma network list";
            cp.exec(cmd, function (err, stdOut) {
                if (err) {
                    console.log(err);
                    callback(err, "three_error2");
                } else if (err == null) {
                    console.log(stdOut);
                    callback(null, "network_success2");
                }
            });
        },
        function (callback) {
            console.log("5");
            cmd = "himma run " + method + " --name " + containername + " -net " + testbridge + " " + ifport + " " + hostport + ":" + containerport + " " + imagename + " \"" + inputcmd + "\"";
            cp.exec(cmd, function (err, stdOut) {
                if (err) {
                    console.log(err);
                    callback(err, "five_error");
                } else if (err == null) {
                    console.log(cmd);
                    console.log(stdOut);
                    callback(null, "five_success");
                }
            });
        },
        function (callback) {
            console.log("container list");
            cmd = "himma ps";
            cp.exec(cmd, function (err, stdOut) {
                if (err) {
                    console.log(err);
                    callback(err, "three_error2");
                } else if (err == null) {
                    console.log(stdOut);
                    callback(null, "containerlist_success2");
                }
            });
        }
    ], function (err, result) {
        if (!err)
            console.log(result);
        else
            console.log(err);

    });
}

function new_containers2(method,imagename,containername,inputcmd){
    async.series([
        function (callback) {
            console.log("network");
            cmd = "himma network list";
            cp.exec(cmd,function (err,stdOut) {
                if(err){
                    console.log(err);
                    callback(err,"network_error");
                }
                else if(err == null){
                    console.log(stdOut);
                    callback(null,"network_success");
                }
            });
        },
        function (callback) {
            console.log("1");
            cmd = "himma run " + method + " --name " + containername + " -net " + testbridge + " " + imagename + " \"" + inputcmd + "\"";
            cp.exec(cmd,function (err, stdOut) {
                if(err){
                    console.log(err);
                    callback(err,"one_error");
                }
                else if(err == null){
                    console.log(cmd);
                    console.log(stdOut);
                    callback(null,"one_success");
                }
            });
        },
        function (callback) {
            console.log("container list");
            cmd = "himma ps";
            cp.exec(cmd,function (err,stdOut) {
                if(err){
                    console.log(err);
                    callback(err,"two_error");
                }
                else if(err == null){
                    console.log(stdOut);
                    callback(null,"containerlist_success");
                }
            });
        }
    ], function (err,result) {
        if(!err)
            console.log(result);
        else
            console.log(err);
    });
}


module.exports = {
    new_containers1,
    new_containers2
};




