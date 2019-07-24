/**
 * @Auther: JiangYu
 * @Date: 2019/7/23 14:04
 */
var mysql = require("mysql");


exports.selectSite = function (siteName)

{
    var connection = mysql.createConnection({
        host     : 'localhost',
        port     : '3306',
        user     : 'root',
        password : 'root',
        database : 'site'
    });
    connection.connect();
    var sql = 'select x,y,z from site_table where name='+siteName;

    return new Promise(function (resolve,reject) {
        connection.query(sql, function (err,result) {
            if(err){
                console.log('[SELECT ERROR]:',err.message);
                reject(err);
            }
            console.log(result);  //数据库查询结果返回到result中
            resolve(result);

        });
    });
    connection.end();
}