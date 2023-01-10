const mqtt = require("mqtt");

const client = mqtt.connect('mqtt://127.0.0.1:1883', {
    username: "user",
    password: '123456'
});

client.on("connect", function () {
    console.log("服务器连接成功");
    console.log(client.options.clientId);
    client.publish("text", JSON.stringify({ id: 1 }), { qos: 0, retain: true }); // 发布主题text消息
});

// 从控制台接受输入
process.stdin.on('data', function (data) {
    client.publish("text", data.toString(), { qos: 0, retain: true }); // 发布主题text消息
});