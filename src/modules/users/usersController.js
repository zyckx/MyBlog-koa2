const usersRouter = require('koa-router')();
const userService = require('./userService');

usersRouter.post('/login', userService.login);
usersRouter.post('/register', userService.register);
usersRouter.get('/login/captcha', userService.getSvgCap);

usersRouter.post('/test', userService.test);

module.exports = usersRouter;
