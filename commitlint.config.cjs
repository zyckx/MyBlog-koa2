module.exports= {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
             'always', 
             [
                'feat',//新功能（feature）
                'fix',//修补bug
                'docs',//文档（documentation）
                'style',// 格式（不影响代码运行的变动）
                'refactor',//重构（即不是新增功能，也不是修改bug的代码变动）
                'test',//增加测试
                'chore',//构建过程或辅助工具的变动
                'revert',//回滚
                'merge',//合并
                'init',//初始化
                'release',//发布
                'update',//更新
                'delete',//删除
                'add',//添加
                'modify',//修改
                'move',//移动
                'rename',//重命名
                'format',//格式化
                'optimize',//优化
                'config',//配置
                'sync',//同步
                'build',//构建
                'ci',//持续集成
                'perf',//性能优化   
                'wip',//工作进行中
                'types',//类型定义文件更改
             ]],
        'type-empty': [0],
        'type-case': [0],
        'scope-empty': [0],
        'scope-case': [0],


        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never'],
        'header-max-length': [0, 'always', 72],


    }
}
