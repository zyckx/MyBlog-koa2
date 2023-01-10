const User = require("./userSchema");
const crypt = require("../../utils/crypt");
const createToken = require("../../utils/createToken");

class UserService {
  constructor() {}

  static async login(ctx) {
    const { username, password } = ctx.request.body;
    let result = await User.findOne({ username: username });
    if (result) {
      if (crypt.decrypt(password, result.password)) {
        const token = createToken(result);
        ctx.success("登录成功", result, token);
      } else {
        ctx.fail("密码错误", 404);
      }
    } else {
      ctx.fail("出错，请重试", -1);
    }
  }

  static async register(ctx) {
    const { username, password } = ctx.request.body;
    let registerInfo = new User({
      username: username,
      password: crypt.encrypt(password),
    });
    const result = await registerInfo.save();
    if (result) {
      ctx.success("注册成功", result);
    }
  }

  static async test(ctx) {
    ctx.body = "这是一个带有认证的token test接口";
  }
}

module.exports = UserService;
