const config = require("../configs/config");

const jwt = require("jsonwebtoken");


//返回一个token
module.exports = (userInfo) => {
    let privateKey = config.jwt.secret;
    let expiresIn = config.jwt.expiresIn;
    const token = jwt.sign({
            id: userInfo.id
        }, privateKey, {
            expiresIn
        });
    return token;
};