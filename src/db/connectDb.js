//引入config.js的配置
const config = require('../configs/config')
const mongoose = require('mongoose')

// ${ config.mongodb.user }:${ config.mongodb.password }@
const mongoUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`;

mongoose.set('strictQuery', false);

module.exports=()=>{
    mongoose.connect(mongoUrl);
}


