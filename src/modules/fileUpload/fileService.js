const File = require('./fileSchema');
const path = require('path');

class fileService {
	constructor() {}

	static async uploadFile(ctx) {
		// 上传单个文件
		let file = ctx.request.files.file;

		let baseName = path.basename(file.filepath);

		let fileUrl = path.join(ctx.origin, '/uploads/', baseName);
		//获取上传者的id
		let userId = ctx.state.user.id;
		let uploadFile = new File({
			url: fileUrl,
			name: file.newFilename,
			type: file.mimetype,
			size: file.size,
			uploadTime: Date.now(),
			upLoader: userId,
			baseName: baseName,
		});
		console.log(userId);
		let result = await uploadFile.save();
		if (result) {
			ctx.success('上传成功', result);
		}
	}

	static async test(ctx) {
		ctx.success('test');
	}
}

module.exports = fileService;
