const express = require("express");
const formidable = require('formidable');
const app = express();
const nodemailer = require("nodemailer");

//设置邮箱授权
let transporter = nodemailer.createTransport({
	service: '163',
	auth: {
		user: 'sbpengbo9@163.com',
		pass: 'chongyang99'
	}
})


app.post("/api/email", (req, res, next) => {
	var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
    	//邮箱内容的格式
		const content = `<div style="width: 90%; border: 2px solid lightgreen; margin: 1rem auto; padding: 1rem; text-align: center;">
	    <p style="border-bottom: 1px dashed lightgreen;margin: 0;padding-bottom: 1rem; color: lightgreen; font-size: 1.25rem;">MyBlog Message</p>
		<p style="margin: 1rem 0 0;">hello,站长 &#x1f608</p>
		<p sytle="margin: 0 0 1rem;">你有一条新留言</p>
		<p style="width: 70%; border-left: 4px solid lightgreen; padding: 1rem; margin: 0 auto 2rem; text-align: left;white-space: pre-line;">主题: ${fields.title}
		内容: ${fields.content}
		邮箱: ${fields.email}
	    </p>
	    <a href="https://www.xxx.cn" style="text-decoration: none; background: lightgreen;color: #fff; height: 2rem; line-height: 2rem; padding: 0 1rem; display: inline-block; border-radius: 0.2rem;">回到博客</a>
	    </div>`;
	    //发送参数
	    let mailOptions = {
		    from: '"重阳小博客" <sbpengbo9@163.com>', // 发送者
		    to: '89305141@qq.com', // 接受者,可以同时发送多个,以逗号隔开
		    subject: '您的博客有一条新留言', // 标题
		    //text: 'Hello world', // 文本
		    html: content
		};
	    transporter.sendMail(mailOptions,(err)=>{
	    	if (err) {
	            console.log(err)
	            res.status(504).end("通知邮件发送失败")
	        } else {
	        	res.send("1");
	            console.log("Message sent: " + info.response)
	        }
	    })
    });

})

module.exports = app;
