const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://127.0.0.1:1883', {
	username: 'user',
	password: '123456',
});

client.on('connect', function () {
	console.log('服务器连接成功');
	console.log(client.options.clientId);
	client.subscribe('text', { qos: 1 }); // 订阅text消息
});

client.on('message', function (top, message) {
	console.log('当前topic：', top);
	console.log(message.toString());
});
