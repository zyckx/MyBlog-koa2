module.exports = {
    // 一行最多 80 字符
    printWidth: 80,
    // 缩进 4 个空格
    tabWidth: 4,
    // 使用 tabs 替代空格
    useTabs: true,
    // 行尾 分号
    semi: true,
    singleQuote: true,
    // props 是否用 引号 包裹
    quoteProps: 'as-needed',
    // 单引号
    jsxSingleQuote: true,
    // 行尾逗号
    trailingComma: 'all',
    // 花括号内填充空格 { a: 23 }
    bracketSpacing: true,
    // jsx html 标签是否在同行
    // <span
    // >
    // </span>
    jsxBracketSameLine: false,
    // 箭头函数一个参数是否使用括号包裹参数
    arrowParens: 'avoid',
    // 格式化代码的区间
    // "rangeStart": 0,
    //"rangeEnd": 9999,
    // 解析文件类型
    parser: 'babel-ts',
    // 仅格式化带有 @format 、 @prettier 头的文件
    requirePragma: false,
    // 插入 @format 在文件头部
    insertPragma: false,
    // 超宽换行
    proseWrap: 'always',
    // strict是所有的空格换行情况都保留，ignore的话就是所有元素间的空格都会被忽略
    // eg. <span> sss </span>
    htmlWhitespaceSensitivity: 'strict',
    // just for vue
    vueIndentScriptAndStyle: false,
    // 换行标识
    endOfLine: 'lf',
    // 用于 Markdown 等，自动语言识别
    embeddedLanguageFormatting: 'auto',
};
