# cy_blog

> A Vue.js + Node.js + Mongodb + Express的前后端分离的论坛技术栈

> 论坛地址：http://www.jiangchongyang.cn

## 主要功能
- 登录注册用户，可以上传自己的头像，以及分享搜索技术文章，回复等功，联系站长等功能，
- 还有一个照片墙模块，大家可以上传自己的照片功能

## 主要技术构成
前端主要技术栈为vue.js、vue-router、 vuex 、以及bootstrape 响应式布局 和 markdown编辑器

后端主要技术栈为node.js、 mongodb、 Express框架

## Setup

运行环境
- node.js
- mongoDB

## mongoDB数据库的安装

- 官网：https://www.mongodb.com/

- 手册：https://docs.mongodb.org/manual/

安装完数据库后设置环境变量 
```
C:\Program Files\MongoDB\Server\3.0\bin 到path，根据自己的安装路径进行设置。
```
启动mongodb。

- mongod --dbpath c:\mongo  //c:\mongo 为数据库位置,可自行设置（不要关闭当前窗口）

- mongo  //打开另外一个cmd窗口,输入mongo 开机


## Setup

运行环境
- node.js
- mongoDB

克隆远程库
```
git clone https://github.com/ChongYnag/cy_blog.git
```
进入项目目录cy_blog后，安装依赖
```
npm install
```
运行服务器。（确保数据库mongodb已经启动，不要关闭当前窗口，然后重新打开另外一个dos窗口，进行下一个步骤）
```
npm run start
```
生产模式，开发阶段 默认端口为 8080
```
npm run dev
```
打包上线 生成dist目录 访问路径为域名根目录 //http:127.0.0.1:8080
```
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
