const usersRouter=require('koa-router')()
const userService=require('./userService')

usersRouter.post('/login',userService.login)
usersRouter.post('/register',userService.register)

usersRouter.post('/test',userService.test)

module.exports=usersRouter