const tagRouter=require('koa-router')()
const tagService=require('./tagService')



tagRouter.post('/tag',tagService.createTag)
tagRouter.get('/test',tagService.test)

module.exports=tagRouter