const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
moment.locale('zh-cn');

// 文章表共6个字段
const messageSchema = new Schema({
	//客户端订阅主题
	clientSubscribeTopic: {
		type: String,
		required: true,
		default: '',
	},
	//客户端发布主题
	clientPublishTopic: {
		type: String,
		required: true,
		default: '',
	},
	//客户端发布消息
	clientPublishMessage: {
		type: String,
		required: true,
		default: '',
	},
	//客户端发布消息时间
	clientPublishTime: {
		type: Date,
		required: true,
		default: new Date(),
	},
	//客户端接收消息
	clientReceiveMessage: {
		type: String,
	},
	//客户端接收消息时间
	clientReceiveTime: {
		type: Date,
	},
});

//必须先set后get
messageSchema.set('toJSON', { getters: true, virtuals: true });
messageSchema.set('toObject', { getters: true, virtuals: true });
messageSchema.path('createTime').get(function (v) {
	return moment(v).format('YYYY MMMM Do, h:mm:ss a');
});
messageSchema.path('lastEditTime').get(function (v) {
	return moment(v).format('YYYY MMMM Do, h:mm:ss a');
});

module.exports = mongoose.model('messages', messageSchema);
