const fileRouter = require('koa-router')();
const fileService = require('./fileService');

fileRouter.post('/upFile', fileService.test);

fileRouter.post('/test', fileService.test);

module.exports = fileRouter;
