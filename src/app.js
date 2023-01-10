const koa = require("koa")
const staticFolder = require("koa-static");
const bodyParser=require('koa-bodyparser')
const logger = require("koa-logger");
const koaJwt = require('koa-jwt')
const checkToken=require('./middlewares/checkToken')
const routerResponse =require('./middlewares/routerResponse')
const config = require("./configs/config");


const app = new koa();


const connectDb = require('./db/connectDb')
connectDb()

app.use(logger());
app.use(bodyParser());
app.use(staticFolder(__dirname + "/static"));
app.use(routerResponse())


app.use(checkToken)


app.use(koaJwt({secret: config.jwt.secret,}).unless(
    {
        // 设置login、register接口，可以不需要认证访问
        path: [
            /^\/api\/users\/login/,
            /^\/api\/users\/register/,
            /^((?!\/api).)*$/   // 设置除了私有接口外的其它资源，可以不需要认证访问
        ]
    }
));

const router = require("./modules/router");
app.use(router.routes()).use(router.allowedMethods());


app.listen(config.app.port, () => {
    console.log("server is running at http://localhost:" + config.app.port);
});
