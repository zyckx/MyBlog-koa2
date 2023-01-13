const tagRouter = require('koa-router')();
const tagService = require('./tagService');

tagRouter.post('/createTag', tagService.createTag);
tagRouter.get('/getAllTags', tagService.getAllTags);
tagRouter.get('/modifyTag', tagService.modifyTag);
tagRouter.get('/deleteTag', tagService.deleteTag);
tagRouter.get('/test', tagService.test);

module.exports = tagRouter;
