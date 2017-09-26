const express = require("express");
const app = express();
const db = require("../db/db.js");
const sd = require('silly-datetime');

const port = require("../app.js");
//处理首页的文章列表
app.post("/api/home",(req,res,next)=>{
	
	let host = req.hostname+':'+port.port;
	console.log(host);

  db.find("articles",{isPublish:true},{size:3,page:0,sort:{"date":-1}},(err,result)=>{
    // console.log(result);
    for(let i = 0;i<result.length;i++){
      result[i].date = sd.format(result[i].date,"YYYY-mm-DD hh:MM:ss");
    }
    res.send(result);
  });
});
module.exports = app;
