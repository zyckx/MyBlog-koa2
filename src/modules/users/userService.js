const User = require('./userSchema');
const crypt = require('../../utils/crypt');
const createToken = require('../../utils/createToken');

const createSvg = require('../../utils/createSvg');

class UserService {
	constructor() {}

	static async login(ctx) {
		const { username, password } = ctx.request.body;
		let result = await User.findOne({ username: username });
		if (result) {
			if (crypt.decrypt(password, result.password)) {
				const token = createToken(result);
				ctx.success('登录成功', result, token);
			} else {
				ctx.fail('密码错误', 404);
			}
		} else {
			ctx.fail('出错，请重试', -1);
		}
	}

	static async register(ctx) {
		const { username, password } = ctx.request.body;

		let res = await User.findOne({ username: username });
		// 每次查询后都需要判断后读取res
		if (res) {
			if (res.username === username) {
				console.log(res.name);
				ctx.fail('用户名已经存在', -1);
			}
		} else {
			let registerInfo = new User({
				username: username,
				password: crypt.encrypt(password),
			});
			let result = await registerInfo.save();
			if (result) {
				ctx.success('注册成功', result);
			}
		}
	}

	static async test(ctx) {
		ctx.body = '这是一个带有认证的token test接口';
	}
	static async getSvgCap(ctx) {
		let { text, data } = createSvg();

		ctx.type = 'image/svg+xml';
		ctx.body = data;
		ctx.session.captcha = text;
		console.log(ctx.session);
	}
}

module.exports = UserService;
