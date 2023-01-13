module.exports = async (ctx, next) => {
	/*   let token = ctx.header.authorization;
    const { time, timeout } = jwt.verify(token, config.jwt.secret);
    let { iat, exp } = ctx.state.user;

    let date = new Date().getTime();
    if (date - iat > exp) {
      ctx.fail("token已过期", 401);
    }
    console.log(ctx.response);
    console.log(time, timeout);
 */
	await next().catch(err => {
		if (err.status === 401) {
			ctx.fail(
				err.originalError ? err.originalError.message : err.message,
				err.status,
			);
		} else {
			throw err;
		}
	});
};
