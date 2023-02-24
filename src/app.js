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
const aedes = require('./mqtt/mqtt-server');
const app = new koa();

const connectDb = require('./db/connectDb');
aedes(); //启动mqtt服务
connectDb();

app.use(logger());
app.use(koaBody(config.uploadOption));

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
			/^\/*/,
			/^\/api\/*\/*/,
			/^\/api\/users\/register/,
			/^\/api\/articles\/getArticle/,
		],
	}),
);

const router = require('./modules/router');

app.use(router.routes()).use(router.allowedMethods());

app.listen(config.app.port, () => {
	console.log('server is running at http://localhost:' + config.app.port);
});
