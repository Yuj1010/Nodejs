var file = require("../models/file.js");
var formidable=require("formidable");
var path = require("path");
var fs = require("fs");
exports.showIndex = function (req,res,next) {
    file.getAllAlbum(function (err,allAlbums) {
        if(err){
            next();
            return;
        }
        res.render("index",{
            "albums":allAlbums
        })
    });
}

exports.showAlbum = function (req,res,next) {
    var albumName = req.params.albumName;
    file.getAllImageByAlbumName(albumName,function (err,imageArray) {
        if(err){
            next();
            return;
        }
        res.render("album",{
            "albumname":albumName,
            "image":imageArray
        });
    });

}

exports.showUp = function (req,res,next) {
    file.getAllAlbum(function (err,albums) {
        res.render("up",{
            "albums":albums
                });
    });

}
 exports.doPost = function (req,res) {
     var form = new formidable.IncomingForm();
     form.uploadDir=path.normalize(__dirname+"/../temp");
     form.parse(req,function (err,fields,files,next) {
         console.log(fields);
         console.log(files);
         if(err){
             next();
             return;
         }
         var ran = parseInt(Math.random() * 89999 + 10000);
         var extname = path.extname(files.photo.name);

         var wenjianjia = fields.directory;
         var oldpath = files.photo.path ;
         var newpath = path.normalize(__dirname + "/../uploads/" + wenjianjia + "/" + ran + extname);
         fs.rename(oldpath,newpath,function(err){
             if(err){
                 res.send("改名失败");
                 return;
             }
             res.send("成功");
         });
     });
     return;

 }