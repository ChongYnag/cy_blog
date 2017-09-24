const express = require("express");
const app = express();
const formidable = require('formidable');
const md5 = require("../db/md5.js");
const db = require("../db/db.js");
app.post("/api/regist",(req,res,next)=>{
  let form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    let user = fields.name;
    let pwd = md5(fields.password);
    db.find("users",{"name":user},(err,result)=>{
      if(err){
        console.log(err);
        res.send("-1");
      }
      if(result.length){
        res.send("-2");//该用户已经注册
      }else {
        db.insertOne("users",{"name":user,"password":pwd},(err,result)=>{
          if(err){
            console.log(err);
            res.send("-1");
          }
          res.send("1");
        })
      }
    });
  });
});
module.exports= app;
