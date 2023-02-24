const aedes = require('aedes')();

module.exports = () => {
	const server = require('net').createServer(aedes.handle);

	aedes.on('client', client => {
		console.log('Client connected:', client.id);
	});

	aedes.on('publish', (packet, client) => {
		if (client) {
			console.log('Received message from client', client.id);
			console.log('Message:', packet.payload.toString());
		}
	});
	server.listen(1883, function () {
		console.log('MQTT server listening on port 1883');
	});
};
