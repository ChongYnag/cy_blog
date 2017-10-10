const express = require("express");
const app = express();
const db = require("../db/db.js");
const sd = require('silly-datetime');
const formidable = require('formidable');
let session = require('express-session');
//session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.post("/api/edit",(req,res,next)=>{
  if(req.session.user){
    let form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      console.log(fields);
      let title = fields.title;
      let content = fields.content;
      let user = req.session.user;
      // let user = "chongyang";
      db.insertOne('articles',{title:title,date:new Date(),content:content,isPublish:true,comment_n:0,author:user,user:user},(err,result)=>{
        if(err){
          console.log(err);
          res.send("-1");
        }
        res.send("1");
      });
    })
  }else{
    res.send("-3");//没有登录
  }
});

module.exports = app;
