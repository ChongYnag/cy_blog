const express = require("express");
const app = express();
const formidable = require('formidable');
const md5 = require("../db/md5.js");
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
app.post("/api/login",(req,res,next)=>{
  let form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    let user = fields.name;
    let pwd = md5(fields.password);
    db.find("users",{user:user},(err,result)=>{
      if(err){
        console.log(err);
        res.send("-1");
      }
      if(result.length){//有这个用户
        if(result[0].password==pwd){
          //写入session
          console.log(result[0]);
          req.session.username = result[0].username;
          req.session.user = result[0].user;

          res.send("1"); //登录成功
          console.log(req.session.user);
        }else{
          res.send("-3")//密码错误
        }
      }else{
        res.send("-2");//用户名不存在
      }
    });
    console.log(user,pwd);
  });
});
//前台判断拿登录信息
app.get("/session",(req,res,next)=>{
  console.log(req.session);
  if(req.session.username){
    res.send(req.session.username);
  }else{
    res.send("noLogin")//没有登录
  }
});
//退出接口
app.get("/logout",(req,res,next)=>{
  getSession="";
  req.session.user = "";
  req.session.username = "";
  res.send("ok");
});
module.exports = app;
