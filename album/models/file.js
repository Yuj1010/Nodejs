var fs = require("fs");

exports.getAllAlbum = function (callback) {
    fs.readdir("./uploads",function (err,files) {
        if(err){
            callback("请求文件不存在",null);
        }
        var allAlbums = [];
        (function  iterator(i) {
            if(i==files.length){
                callback(null,allAlbums);
                return;
            }
            fs.stat("./uploads/"+files[i],function(err,stats)  {
                if(err){
                    callback("找不到文件"+files[i],null);
                }
                if(stats.isDirectory()){
                    allAlbums.push(files[i]);
                }
                iterator(i+1);
            });
        })(0);
    });
}

exports.getAllImageByAlbumName = function (albumName,callback) {
    fs.readdir("./uploads/" + albumName,function(err,files){
        if(err){
            callback("没有找到uploads文件",null);
            return;
        }
        var allImage = [];
        (function iterator(i){
            if(i == files.length){
                //遍历结束
                console.log(allImage);
                callback(null,allImage);
                return;
            }
            fs.stat("./uploads/" + albumName + "/" + files[i],function(err,stats){
                if(err){
                    callback("找不到文件" + files[i] , null);
                    return;
                }
                if(stats.isFile()){
                    allImage.push(files[i]);
                }
                iterator(i + 1);
            });
        })(0);
    });
}