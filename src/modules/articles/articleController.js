const articlesRouter=require('koa-router')()

articlesRouter.get('/',(ctx)=>{
  ctx.body="article123"
})

module.exports=articlesRouter