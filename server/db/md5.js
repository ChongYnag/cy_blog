let crypto = require('crypto');
module.exports = (mima)=>{
  return crypto.createHash("md5").update(mima).digest("base64");
};