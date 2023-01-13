const articlesRouter = require('koa-router')();
const articleService = require('./articleService');
const tagRouter = require('./tag/tagController');

articlesRouter.use('/tag', tagRouter.routes(), tagRouter.allowedMethods());
articlesRouter.post('/createArticle', articleService.createArticle);
articlesRouter.get('/getArticle', articleService.getArticle);
articlesRouter.get('/test', articleService.test);

module.exports = articlesRouter;
