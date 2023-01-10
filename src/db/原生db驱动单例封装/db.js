//引入config.js的配置

const dbConfig = require("./config");

//引入 MongoClient

const MongoClient = require("mongodb").MongoClient;


// 定义Db类
class Db {
    // 设计一个单例模式
    static getInstance() {
        if(!Db.instance) {
            Db.instance = new Db();
        }
        return Db.instance;
    }
    // 构造函数
    constructor() {
        this.dbClient = "";
        this.connect();
    }
    // 连接数据库
    connect() {
        return new Promise((resolve, reject) => {
            if(!this.dbClient) {
                MongoClient.connect(dbConfig.dbUrl, { useNewUrlParser: true }, (err, client) => {
                    if(err) {
                        reject(err);
                    } else {
                        this.dbClient = client.db(dbConfig.dbName);
                        resolve(this.dbClient);
                    }
                });
            } else {
                resolve(this.dbClient);
            }
        });
    }
    // 查找数据
    find(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                var result = db.collection(collectionName).find(json);
                result.toArray(function(err, docs) {
                    if(err) {
                        reject(err);
                        return;
                    }
                    resolve(docs);
                });
            });
        });
    }
    // 插入数据
    insert(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).insertOne(json, (err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        });
    }
    // 更新数据
    update(collectionName, json1, json2) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).updateOne(json1, {
                    $set: json2
                }, (err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        });
    }
    // 删除数据
    remove(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).removeOne(json, (err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        });
    }
    // 获取所有数据
    getAllCount(collectionName) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).count({}).then((count) => {
                    resolve(count);
                });
            });
        });
    }
}

module.exports = Db.getInstance();
