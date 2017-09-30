const express = require("express");
const app = express();
const db = require("../db/db.js");
const sd = require('silly-datetime');

const port = require("../app.js");
app.get("/api/pictures",(req,res,next)=>{
  let page =  req.query.page;
  let host = 'http://'+req.hostname+':'+port.port;
  db.find("pictures",{},{size:9,currPages:page,sort:{"date":-1}},(err,result)=>{
    console.log(result);
    //此处需要注意，异步执行，需要强制异步变同步
    (function iterator(i){
      //遍历结束
      if(i == result.length){
        res.send(result);
        return;
      }
      result[i].date = sd.format(result[i].date,"YYYY-MM-DD HH:mm:ss");

      db.find("users",{"user":result[i].user},(err,result1)=>{
        console.log(result[i].user);
        let userInfo ={
          username:result1[0].username,
          authorPic:`${host}/author/picture/${result[i].picture}`,
        };
        result[i].userInfo = userInfo;
        iterator(i+1)
      })
    })(0);
    // res.send(result)
  })
});
module.exports= app;
