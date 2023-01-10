const MongoClient = require('mongodb').MongoClient
const aedes = require('aedes')()

// Connect to MongoDB
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url, { useUnifiedTopology: true })
client.connect(function(err) {
  console.log('Connected to MongoDB')
})

// Configure Aedes to use aedes-persistence-mongodb as persistence store
const persistence = require('aedes-persistence-mongodb')
aedes.persistence =persistence({
    url: 'mongodb://localhost:27017',
    mongo: client,
    ttl: {
        packets: 60 * 60 * 1000, // 1 hour
        subscriptions: 60 * 60 * 1000 // 1 hour
    },
    autoRemoveInterval: 10 * 1000 // 10 seconds

})



// Create MQTT server
const server = require('net').createServer(aedes.handle)
server.listen(1883, function() {
    console.log('Server listening on port 1883')
})


// 身份验证
aedes.authenticate = function (client, username, password, callback) {
    callback(null, (username === 'user' && password.toString() === '123456'));
}
// 客户端连接
aedes.on('client', function (client) {
    console.log('Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id);
});
// 客户端断开
aedes.on('clientDisconnect', function (client) {
    console.log('Client Disconnected: \x1b[31m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id);
});