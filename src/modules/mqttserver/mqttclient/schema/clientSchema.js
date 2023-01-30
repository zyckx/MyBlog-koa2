const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
moment.locale('zh-cn');

// 文章表共6个字段
const clientSchema = new Schema({
	//去掉_id
	_id: false,
	//客户端id
	clientId: {
		type: String,
		required: true,
	},
	//客户端名称
	clientName: {
		type: String,
		required: true,
		default: '未命名',
	},
	//客户端状态
	clientStatus: {
		type: Number,
		required: true,
		default: 0, //0为离线，1为在线
	},
	//客户端ip
	clientIp: {
		type: String,
		default: '',
	},
	//客户端连接时间
	clientConnectTime: {
		type: Date,
	},
	//客户端断开时间
	clientDisconnectTime: {
		type: Date,
	},
	clientMessageInfo: {
		type: Schema.Types.ObjectId,
		ref: 'messages',
	},
});

// const time=moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss")
//必须先set后get
clientSchema.set('toJSON', { getters: true, virtuals: true });
clientSchema.set('toObject', { getters: true, virtuals: true });
clientSchema.path('createTime').get(function (v) {
	return moment(v).format('YYYY MMMM Do, h:mm:ss a');
});
clientSchema.path('lastEditTime').get(function (v) {
	return moment(v).format('YYYY MMMM Do, h:mm:ss a');
});

module.exports = mongoose.model('clients', clientSchema);
