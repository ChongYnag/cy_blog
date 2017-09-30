const email = require("./email.js");
const home = require("./home.js");
const regist = require("./regist.js");
const login = require("./login.js");
const articles = require("./articles.js");
const pictures = require("./pictures.js");
const upload = require("./upload.js");

module.exports = (app)=>{
	app.use(email);
	app.use(home);
	app.use(regist);
	app.use(login);
	app.use(articles);
	app.use(pictures);
	app.use(upload);
};
