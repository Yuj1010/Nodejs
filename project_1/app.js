/**
 * @Auther: JiangYu
 * @Date: 2019/7/22 8:50
 */
var express=require("express");
var app = express();
var router = require("./controller/router.js");
var bodyParser = require("body-parser");
var db = require("./models/db.js");


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./static"));
app.get("/",router.showIndex);
app.get("/select",router.showSelect);
app.post("/select",async function (req,res) {
   var point = req.body;
    console.log(req.body);

   if((point.a==point.b)||(point.a==point.c)||(point.c==point.b)){
       //var warning ='<script>alert("数据有误，请重新选择数据！！！")</script>';
       res.send("数据有误，请重新选择数据！！！");
   }else {
       res.send("收到");
       var a='\''+point.a+'\'';
       var b='\''+point.b+'\'';
       var c='\''+point.c+'\'';
       await db.selectSite(a);
       await db.selectSite(b);
       await db.selectSite(c);

   }

});

app.use(function (req,res) {
    res.render("err",{
        "baseurl": req.pathname
    })
});
app.listen(3000);

