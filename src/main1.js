const aedes = require('aedes')()

// 引入数据库
const MongoClient = require('mongodb').MongoClient;
const dbName = 'aedes';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser: true });

client.connect(function (err) {
    console.log("Connected successfully to server");
});
const db = client.db(dbName);
const server = require('net').createServer(aedes.handle)
const port = 1883

server.listen(port, function () {
    console.log('server started and listening on port ', port)
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

// 消息发布
aedes.on('publish', function (packet, client) {
    console.log('Message received:', packet.payload.toString())
//    console.log(client.id);
    if (packet.qos > 0) {
    //    保存消息
        const collection = db.collection('pendingMessages')
        collection.insertOne({ message: packet.payload.toString() }, function (err, result) {
            console.log('Pending message saved')
        })
    }
});
// 消息订阅
aedes.on('subscribe', function (subscriptions, client) {
    if (client) {
        console.log('Client \x1b[32m' + client.id + '\x1b[0m', 'subscribe', subscriptions);
    }
    console.log(client.id);
})
