const Article = require('./mqttSchema');
const createAbstract = require('../../utils/getArticlesAbstract');
class articleService {
	constructor() {}

	static async createArticle(ctx) {
		const { author, title, content, publish, tags, abstract } =
			ctx.request.body;
		const createTime = new Date();
		const lastEditTime = new Date();
		if (!author) {
			ctx.throw(400, '作者不能为空!');
		}
		if (!title) {
			ctx.throw(400, '标题不能为空!');
		}
		if (!content) {
			ctx.throw(400, '内容不能为空!');
		}
		if (!abstract) {
			ctx.throw(400, '摘要不能为空!');
		}
		let articleInfo = new Article({
			author,
			title,
			content,
			abstract: createAbstract(content, 20),
			publish,
			createTime,
			lastEditTime,
			tags,
		});

		let result = await articleInfo.save();
		if (result) {
			//文章发布成功，顺便也把存储结果返回
			ctx.success('文章创建成功！', result);
		} else {
			ctx.fail('发布文章失败', -1);
		}
	}
	static async getArticle(ctx) {
		// let { sort, page, size } = ctx.request.body;
		let { sort, page, size } = ctx.request.query;
		let res = await Article.aggregate([
			{
				$lookup: {
					from: 'tags', //关联的表
					localField: 'tags', //本地的tags表
					foreignField: '_id', //一般为关联的ID
					as: 'tags',
				},
			},
			// 使用 $limit 和 $skip 实现分页查询
			{ $skip: (page - 1) * Number(size) },
			{ $limit: Number(size) },
			{ $sort: { life: Number(sort) } }, ////1为正序，-1为逆序
		]);
		if (res) {
			ctx.success('查询成功', res);
		}
	}
	static async test(ctx) {
		let res = await Article.find({}).populate('tags').exec();
		if (res) {
			ctx.success('查找全部成功', res);
		}
	}
}

module.exports = articleService;
