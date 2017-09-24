const md5 = require("./md5.js");
//封装对数据库的常用操作。
const MongoClient = require('mongodb').MongoClient;
//连接数据库
const  __connectDB = (callback)=> {
       // let url = 'mongodb://localhost:27017/my-blog';
 let url = 'mongodb://47.93.103.113:27017/my-blog';
    //连接数据库
    MongoClient.connect(url, function(err, db) {
        callback(err,db);
    });
};
//暴露插入
exports.insertOne =  (collectionName,json,callback) =>{
    __connectDB((err,db)=>{
        if(err){
            callback(err,db);
            db.close();
            return;
        }
        db.collection(collectionName).insertOne(json,(err,result)=>{
            callback(err,result);
            db.close();
        })
    })
};
//查找数据，找到所有数据
exports.find =  function(collectionName,json,C,D){
    if(arguments.length ==3){
        var callback = C;
        var limit = 0;
        var skip = 0;
    }else if(arguments.length ==4){
        var args = C;
        var callback = D;
        var limit = args.size || 0;
        var skip = args.currPages*args.size || 0;
        var sort = args.sort || {};
    }
    __connectDB((err,db)=>{
        let collection = db.collection(collectionName);

        // Find some documents
        collection.find(json).limit(limit).skip(skip).sort(sort).toArray(function(err, docs) {
            if(err){
                callback(err,null);
                db.close();
                return;
            }
            callback(null,docs);
            db.close();
        });
    });
};

//删除
exports.del = (collectionName,json,callback)=>{
    __connectDB((err,db)=>{
        db.collection(collectionName).deleteMany(json,(err, result)=>{
            callback(err,result);
            db.close();
        });
    })
};

//修改
exports.updateMany = function (collectionName,json1,json2,callback) {
    __connectDB((err,db)=>{
        db.collection(collectionName).updateMany(json1
            ,json2, (err, result)=>{
                callback(result);
                db.close();
            });
    })
};
const init = ()=>{
    //对数据库进行初始化
    __connectDB((err,db)=>{
        if(err){
            console.log(err);
            return;
        }
        let name = "chongyang"; //初始化博主的用户名
        let pwd = md5("123456"); //初始化博主的密码 用md5加密技术存入数据库

        //创建博主用户
        db.collection("users").find({}).toArray(function(err, docs) {
            if(err){
            	console.log(err);
                db.close();
                return;
            }
            if(!docs.length){
	            db.collection("users").insertOne({name:"chongyang",password:pwd},(err,result)=>{
		            db.close();
		        })
            }
        });

//      db.collection("ssUser").createIndex(
//          {"username":1},null,(err,resulet)=>{
//              console.log("索引建立成功");
//          });
    })
}
//得到总数量
exports.getAllCount = function (collectionName,callback) {
    __connectDB(function (err, db) {
        db.collection(collectionName).count({}).then(function(count) {
            callback(count);
            db.close();
        });
    })
};
//初始化数据库
init();
