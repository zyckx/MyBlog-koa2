const router = require('koa-router')();
const config = require('../configs/config');

const usersRouter = require('./users/usersController');
const articlesRouter = require('./articles/articleController');

// 统一前缀
router.prefix(config.app.routerBaseApi);

router.get('/', ctx => {
	ctx.body = 'hello koa2,this is a success page';
});

router.use('/users', usersRouter.routes(), usersRouter.allowedMethods());
router.use(
	'/articles',
	articlesRouter.routes(),
	articlesRouter.allowedMethods(),
);

module.exports = router;
