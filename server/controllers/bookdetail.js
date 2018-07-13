const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    // 根据id 查找图书 累加count
    const {id} = ctx.request.query
    // 获取图书详情信息
    const detail = await mysql('books')
                        .select()
                        .where('id', id)
                        .first()
    ctx.state.data = detail

    await mysql('books')
            .where('id', id)
            .increment('count', 1)
}