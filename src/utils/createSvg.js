const svgCaptcha = require('svg-captcha');
const config = require('../configs/config');

//这里可以分为字母和数字随机验证码和数字算数随机验证码,
module.exports = () => {
	let captcha = svgCaptcha.create(config.svgOption); //字母和数字随机验证码
	// let captcha = svgCaptcha.createMathExpr(options) //数字算数随机验证码
	// console.log(text,data);
	// text是指产生的验证码，data指svg的字节流信息
	return captcha;
};
