const File = require('./fileSchema');

class fileService {
	constructor() {}

	static async test(ctx) {
		const file = ctx.request.files.file;

		let uploadFile = new File({
			url: file.filepath,
			name: file.newFilename,
			type: file.mimetype,
			size: file.size,
			uploadTime: Date.now(),
			upLoader: 'test',
		});
		let result = await uploadFile.save();
		if (result) {
			ctx.success('上传成功', uploadFile);
		}
	}
}

module.exports = fileService;
