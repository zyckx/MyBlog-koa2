const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

    username: {
        type: String,
        set(val) {
            return val.replace(/\s*/g, "");
            /*str.replace(/\s*!/g,""); //去除字符串内所有的空格
            str.replace(/^\s*|\s*$/g,""); //去除字符串内两头的空格
            str.replace(/^\s*!/,""); //去除字符串内左侧的空格
            str.replace(/(\s*$)/g,""); //去除字符串内右侧的空格*/
        }

    },
    password: {
        type: mongoose.Schema.Types.String,
        require: true,
        trim: true
    },
    createTime: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('User', userSchema, 'User')