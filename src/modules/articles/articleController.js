const articlesRouter = require('koa-router')();
const articleService = require('./articleService');
const tagRouter = require('./tag/tagController');

articlesRouter.use('/tag', tagRouter.routes(), tagRouter.allowedMethods());
articlesRouter.post('/createArticle', articleService.createArticle);
articlesRouter.get('/getArticle', articleService.getArticle);
articlesRouter.get('/getAllArticles', articleService.getAllArticles);
articlesRouter.get('/getOneArticle', articleService.getOneArticle);
articlesRouter.get('/test', articleService.test);

module.exports = articlesRouter;
