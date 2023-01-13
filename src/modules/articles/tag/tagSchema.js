const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 文章表共6个字段
const tagSchema = new Schema({
	tagName: {
		type: String,
		default: '',
	},
});

module.exports = mongoose.model('tags', tagSchema);
