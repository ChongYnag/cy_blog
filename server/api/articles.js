const express = require("express");
const app = express();
const db = require("../db/db.js");
const sd = require('silly-datetime');

//处理首页的文章列表
app.get("/api/articles",(req,res,next)=>{
  let page = req.query.page;
  console.log(page);
  db.find("articles",{isPublish:true},{size:3,currPages:page,sort:{"date":-1}},(err,result)=>{
    // console.log(result);
    for(let i = 0;i<result.length;i++){
      result[i].date = sd.format(result[i].date,"YYYY-mm-DD hh:MM:ss");
    }
    res.send(result);
  });
});
module.exports = app;
