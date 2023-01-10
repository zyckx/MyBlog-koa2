module.exports = async (ctx, next) => {
    // 判断是否是登录接口
    if (ctx.path === "/api/users/login" && ctx.method === "POST") {
        // 判断是否是svg
        console.log(ctx.request.body);
        console.log(ctx.request.body.captcha);
        console.log(ctx.session);
        if ( ctx.request.body.captcha.toLocaleLowerCase()===ctx.session.captcha.toLocaleLowerCase()) {
            await next();
        } else {
            ctx.fail("验证码错误", 400);
        }
    } else {
       
        await next();
    }
};
