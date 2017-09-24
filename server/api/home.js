const express = require("express");
const app = express();
const db = require("../db/db.js");

//处理首页的文章列表
app.post("/api/home",(req,res,next)=>{
  db.find("articles",{isPublish:true},{size:3,page:0,sort:{"date":-1}},(err,result)=>{
    res.send(result);
  });
});
module.exports = app;
