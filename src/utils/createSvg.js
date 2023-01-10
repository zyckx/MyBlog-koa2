const config=require('../configs/config')
 //这里可以分为字母和数字随机验证码和数字算数随机验证码,
  //我就先展示字母和数字随机验证码了,
  //如果想尝试数字算数随机验证码可以将下一行取消注释,将数字算数验证码解开注释即可
  let captcha = svgCaptcha.create(options) //字母和数字随机验证码
  // let captcha = svgCaptcha.createMathExpr(options) //数字算数随机验证码

  let { text, data } = captcha
  // console.log(text,data);
  // text是指产生的验证码，data指svg的字节流信息
  res.type("svg")
  res.send({ img: captcha.data, str: captcha.text })
