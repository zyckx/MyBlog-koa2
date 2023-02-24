const fileRouter = require('koa-router')();
const fileService = require('./fileService');

fileRouter.post('/uploadFile', fileService.uploadFile);

fileRouter.post('/test', fileService.test);

module.exports = fileRouter;
