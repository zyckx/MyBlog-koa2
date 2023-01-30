const aedes = require('aedes')();

const server = require('net').createServer(aedes.handle);
const port = 1883;

// 当设备连接时，会触发client事件，可以在这里做一些操作，比如记录设备的连接时间，设备的id等等
aedes.on('client', function (client) {
	console.log('client connected', client.id);
});
// 当设备断开连接时，会触发clientDisconnect事件，可以在这里做一些操作，比如记录设备的断开时间，设备的id等等
aedes.on('clientDisconnect', function (client) {
	console.log('client disconnect', client.id);
});
// 当设备发布消息时，会触发publish事件，可以在这里做一些操作，比如记录设备的发布消息的时间，设备的id等等
aedes.on('publish', function (packet, client) {
	//订阅设备连接时也会触发publish事件，所以需要判断一下
	if (client) {
		console.log('message from client', client.id);
	}
	console.log(packet.payload.toString());
});
// 当设备订阅主题时，会触发subscribe事件，可以在这里做一些操作，比如记录设备的订阅主题的时间，设备的id等等
aedes.on('subscribe', function (subscriptions, client) {
	console.log('subscribe from client', subscriptions, client.id);
	console.log('subscribe from client', client.id);
});
server.listen(port, function () {
	console.log('server started and listening on port ', port);
});
