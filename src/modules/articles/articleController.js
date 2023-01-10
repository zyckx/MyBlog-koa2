const articlesRouter=require('koa-router')()
const articleService=require('./articleService')



articlesRouter.post('/createArticle',articleService.createArticle)
articlesRouter.get('/test',articleService.test)

module.exports=articlesRouter