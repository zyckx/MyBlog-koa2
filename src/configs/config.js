const fs = require('fs');
let config = {
	admin: {
		username: 'admin',
		password: 'admin',
		name: 'sinner77',
	},
	jwt: {
		secret: 'galaxy',
		// expiresIn: 60 * 60, //以秒为单位
		expiresIn: 60 * 60,
	},
	sessionOption: {
		key: 'galaxy' /** (string) cookie key (default is koa.sess) */,
		/** (number || 'session') maxAge in ms (default is 1 days) */
		/** 'session' will result in a cookie that expires when session/browser is closed */
		/** Warning: If a session cookie is stolen, this cookie will never expire */
		maxAge: 86400000,
		autoCommit: true /** (boolean) automatically commit headers (default true) */,
		overwrite: true /** (boolean) can overwrite or not (default true) */,
		httpOnly: true /** (boolean) httpOnly or not (default true) */,
		signed: false /** (boolean) signed or not (default true) */,
		rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
		renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/,
		secure: false /** (boolean) secure cookie*/,
		sameSite:
			null /** (string) session cookie sameSite options (default null, don't set it) */,
	},
	svgOption: {
		size: 4, // 4个字母
		noise: 2, // 干扰线2条
		color: true, // 文字颜色
		background: '#666', // 背景颜色
		// 数字的时候，设置下面属性。最大，最小，加或者减
		// mathMin: 1,
		// mathMax: 30,
		// mathOperator: "+",
	},
	mongodb: {
		host: '127.0.0.1',
		database: 'blog',
		port: 27017,
		user: '', //非必填
		password: '', //非必填
	},
	app: {
		port: process.env.PORT || 3000,
		routerBaseApi: '/api',
	},
};

// 可以新建一个private.js定义自己的私有配置
if (fs.existsSync(__dirname + '/private.js')) {
	config = Object.assign(config, require('./private.js'));
}
module.exports = config;
