const koa = require('koa');
const staticFolder = require('koa-static');
const { koaBody } = require('koa-body');
const logger = require('koa-logger');
const koaJwt = require('koa-jwt');
const session = require('koa-session');
const checkToken = require('./middlewares/checkToken');
const checkSvg = require('./middlewares/checkSvg');
const routerResponse = require('./middlewares/routerResponse');
const config = require('./configs/config');

const path = require('path');
const app = new koa();

const connectDb = require('./db/connectDb');
connectDb();

app.use(logger());
app.use(
	koaBody({
		// 支持文件格式
		multipart: true,
		formidable: {
			// 上传目录
			uploadDir: path.join(__dirname, './static'),
			// join和resolve的区别
			// join是将多个路径拼接成一个路径，resolve是将多个路径解析成一个绝对路径
			// 保留文件扩展名
			keepExtensions: true,
		},
	}),
);

app.keys = [config.sessionOption.key];

app.use(session(config.sessionOption, app));

app.use(staticFolder(__dirname + '/static'));
// 统一处理在前面
app.use(routerResponse());

app.use(checkSvg);
app.use(checkToken);

app.use(
	koaJwt({ secret: config.jwt.secret }).unless({
		// 设置login、register接口，可以不需要认证访问
		path: [
			/^\/api\/users\/login/,
			/^\/api\/users\/login/,
			/^\/api\/users\/register/,
			/^\/api\/static\/uploads/,
			/^((?!\/api).)*$/, // 设置除了私有接口外的其它资源，可以不需要认证访问
		],
	}),
);

const router = require('./modules/router');
app.use(router.routes()).use(router.allowedMethods());

app.listen(config.app.port, () => {
	console.log('server is running at http://localhost:' + config.app.port);
});
