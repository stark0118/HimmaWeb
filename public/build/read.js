var path = require("path");
var readline = require('readline');
var fs = require('fs');
var os = require('os');

var fReadName = path.join(__dirname, "../build/container.log");
var fWriteName = './1.readline.log';
var fRead = fs.createReadStream(fReadName);
var fWrite = fs.createWriteStream(fWriteName);


function readinf() {
    var objReadline = readline.createInterface({
        input: fRead,
// 这是另一种复制方式，这样on('line')里就不必再调用fWrite.write(line)，当只是纯粹复制文件时推荐使用
// 但文件末尾会多算一次index计数   sodino.com
//  output: fWrite,
//  terminal: true
    });


    var log = [];
    objReadline.on('line', (line)=>{
        console.log(line);
        log.push(line.toString())
    });

    objReadline.on('close', ()=>{
        console.log('readline close...');
        console.log(log);
        return log
    });

}

module.exports = {
    readinf,
};