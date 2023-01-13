module.exports = function routerResponse(option = {}) {
	return async (ctx, next) => {
		ctx.success = (message, data, token) => {
			ctx.type = option.type || 'json';

			ctx.body = {
				code: option.successCode || 200,
				msg: message,
				token: token,
				data: data,
			};
		};
		ctx.fail = (message, code) => {
			ctx.type = option.type || 'json';
			ctx.body = {
				code: code || option.failCode || 500,
				msg: message || option.failMsg || 'failed',
			};
			console.log(ctx.body);
		};
		await next();
	};
};
