const articleSchema = require("./articleSchema");
const createAbstract=require('../../utils/getArticlesAbstract')
class articleService {
    constructor() { }

    static async createArticle(ctx) {
        const { author, title, content, publish, tags, abstract } =ctx.request.body;
        const createTime = new Date();
        const lastEditTime = new Date();
        if (!author) {
            ctx.throw(400, "作者不能为空!");
        }
        if (!title) {
            ctx.throw(400, "标题不能为空!");
        }
        if (!content) {
            ctx.throw(400, "内容不能为空!");
        }
        if (!abstract) {
            ctx.throw(400, "摘要不能为空!");
        }
        let articleInfo = new articleSchema({
            author,
            title,
            content,
            abstract:createAbstract(content,20),
            publish,
            createTime,
            lastEditTime,
            tags,
        });

        let result = await articleInfo.save();
        if (result) {
            //文章发布成功，顺便也把存储结果返回
            ctx.success("文章创建成功！", result);
        } else {
            ctx.fail("发布文章失败", -1);
        }
    }

    static test(ctx){
        ctx.body="test"
    }
}

module.exports=articleService