const mongoose = require('mongoose');
const moment = require('moment/moment');
const Schema = mongoose.Schema;

moment.locale('zh-cn');

const fileSchema = new Schema({
	url: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	// 类型
	type: {
		type: String,
		required: true,
	},
	size: {
		type: Number,
		required: true,
	},
	uploadTime: {
		type: Date,
		default: Date.now,
	},
	upLoader: {
		type: String,
		required: true,
	},
});
//必须先set后get
fileSchema.set('toJSON', { getters: true, virtuals: true });
fileSchema.set('toObject', { getters: true, virtuals: true });
fileSchema.path('uploadTime').get(function (v) {
	return moment(v).format('YYYY MMMM Do, h:mm:ss a');
});
fileSchema.path('url').set(function (v) {
	// 替换dirname
	return v.replace(__dirname, '');
});
module.exports = mongoose.model('File', fileSchema);
