const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
moment.locale("zh-cn");

// 文章表共6个字段
const articleSchema = new Schema({
    author: String,
    title: String,
    content: String,
    abstract: String,
    publish: {
        type: Boolean,
        default: false,
    },
    createTime: {
        type: Date,
        default: Date.now(),
    },
    lastEditTime: {
        type: Date,
        default: Date.now,
    },
    tags: { type: String }, //type为tag文档的id
});
//必须先set后get
articleSchema.set("toJSON", { getters: true, virtuals: true });
articleSchema.set("toObject", { getters: true, virtuals: true });
articleSchema.path("createTime").get(function (v) {
    return moment(v).format("YYYY MMMM Do, h:mm:ss a");
});
articleSchema.path("lastEditTime").get(function (v) {
    return moment(v).format("YYYY MMMM Do, h:mm:ss a");
});

module.exports = mongoose.model("article", articleSchema);
