const express = require("express");
const app = express();
const db = require("../db/db.js");
const sd = require('silly-datetime');
const port = require("../app.js");
//处理首页的文章列表
app.get("/api/articles",(req,res,next)=>{

  let page = req.query.page;
  let host = 'http://'+req.hostname+':'+port.port;

  db.find("articles",{isPublish:true},{size:9,currPages:page,sort:{"date":-1}},(err,result)=>{
  	//此处需要注意，异步执行，需要强制异步变同步
    (function iterator(i){
			//遍历结束
			if(i == result.length){
				res.send(result);
				return;
			}
      result[i].date = sd.format(result[i].date,"YYYY-MM-DD HH:mm:ss");

		    db.find("users",{"user":result[i].user},(err,result1)=>{
		      	let userInfo ={
		    		username:result1[0].username,
		    		authorPic:`${host}/author/${result1[0].author}`,
		    	}
		      	result[i].userInfo = userInfo;

		      	iterator(i+1)
		     })
		})(0);
  });
});
module.exports = app;
