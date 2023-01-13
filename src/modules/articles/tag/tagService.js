const Tag = require('./tagSchema');

class tagService {
	constructor() {}
	//添加标签: 这里需要注意如果标签已经存在那么不再创建
	static async createTag(ctx) {
		let { tag } = ctx.request.body;
		console.log(tag);
		if (!tag) {
			ctx.fail('标签类型不能为空', 400);
		} else {
			let isOldTag = await Tag.findOne({ tagName: tag }).exec();
			if (isOldTag) {
				ctx.success('这是已经存在的标签！', isOldTag);
			} else {
				let tagInfo = new Tag({
					tagName: tag,
				});
				let result = await tagInfo.save();
				if (result) {
					ctx.success('添加标签成功！', result);
				} else {
					ctx.fail('服务器内部错误-createTag错误!', 500);
				}
			}
		}
	}
	//获得所有标签
	static async getAllTags(ctx) {
		let result = await Tag.find({});
		ctx.success('获得所有标签成功!', result);
	}
	//修改标签
	static async modifyTag(ctx) {
		let id = ctx.params.id;
		let modeifyTag = ctx.request.body.name;
		if (!modeifyTag) {
			ctx.fail('标签类型不能为空', 400);
		}
		let result = await Tag.findByIdAndUpdate(
			id,
			{
				modeifyTag,
			},
			{
				new: true, //返回新的已修改的信息
			},
		)
			.exec()
			.catch(err => {
				ctx.fail(err, 500);
			});
		ctx.success('修改标签成功!', result);
	}
	//删除标签
	static async deleteTag(ctx) {
		const id = ctx.params.id;
		let result = await Tag.findByIdAndRemove(id)
			.exec()
			.catch(err => {
				ctx.fail(err, 500);
			});
		ctx.success('删除标签成功!', result);
	}

	static test(ctx) {
		ctx.body = 'test';
	}
}

module.exports = tagService;
