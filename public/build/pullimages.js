var cp = require('child_process');
var lineReader = require('line-reader');
var async = require("async");
var fs=require('fs');//引入他的模块之后调用读取文件的方法

var imagename = "hello-world";
var version = "latest";
var cmd;
var line;
var path = '/root';
var myimagename;
var myDate = new Date();

function pull(imagename) {
    async.series([
        function (callback) {
            console.log("2");
            cmd = "cd " + path + "/images";
            cp.exec(cmd, function (err) {
                if (err) {
                    console.log(err);
                    callback(err, "teo_error")
                } else if (err == null) {
                    callback(null, 'two_success');
                }
            });

        },
        function (callback) {
            console.log("3");
            cmd = "sudo docker pull " + imagename + ":" + version;
            cp.exec(cmd, function (err) {
                if (err) {
                    console.log(err);
                    callback(err, "three_error");
                } else if (err == null) {
                    callback(null, "three_success");
                }
            });
        },
        function (callback) {
            console.log("4");
            myimagename = "my" + imagename + myDate.getMilliseconds();
            cmd = "sudo docker run --name " + myimagename + " -d " + imagename + ":" + version;
            cp.exec(cmd, function (err) {
                if (err) {
                    console.log(err);
                    callback(err, "four_error");
                } else if (err == null) {
                    callback(null, "four_success");
                }
            });

        },
        function (callback) {
            console.log("5");
            cmd = "sudo docker export -o " + path + "/images/" + imagename + ":" + version + ".tar" + " " + myimagename;
            console.log(cmd);
            cp.exec(cmd, function (err) {
                if (err) {
                    console.log(err);
                    callback(err, "five_error");
                } else if (err == null) {
                    console.log("pull image success");
                    callback(null, "five_success");
                }
            });
        },
        function (callback) {
            console.log("6");
            cmd = "sudo docker stop " + myimagename;
            cp.exec(cmd, function (err) {
                if (err) {
                    console.log(err);
                } else if (err == null) {
                    callback(null, "six_success");
                }
            })
        }
    ], function (err, result) {
        if (!err)
            console.log(result)
        else
            console.log(err);
    });
}

module.exports = {
    pull
};