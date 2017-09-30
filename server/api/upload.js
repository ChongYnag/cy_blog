const express = require("express");
const app = express();
const formidable = require('formidable');
const sd = require('silly-datetime');
const path = require("path");
const fs = require("fs");
const db = require("../db/db.js");
let session = require('express-session');
//session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
// let getSession = "";
app.post("/api/upload",(req,res,next)=>{
  let user = req.session.user; //先写死，这个用户应该是读session
  if(user){
    let form = new formidable.IncomingForm();
    //上传的图片临时存放在tempup目录下
    form.uploadDir =__dirname+"/../tempup/";
    form.parse(req, function(err, fields, files) {
      if(err){
        res.send("-1");//上传失败
      }
      let ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
      let ran = parseInt(Math.random() * 89999 + 10000);
      let extname = path.extname(files.file.name);

      let picName = user+ttt+ran+extname;
      let oldpath = files.file.path;
      let newpath = __dirname+"/../author/picture/"+picName;
      fs.rename(oldpath,newpath,(err)=>{
        if(err){
          res.send("-1");//上传失败
        }
        db.insertOne("pictures",{user:user,picture:picName,date:new Date()},(err,result)=>{
          if(err){
            res.send("-1");//上传失败
          }
          res.send("1");//成功
        })
      });
    });
  }else{
    res.send("-9");//没有登录
  }

});
module.exports = app;
