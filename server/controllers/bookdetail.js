const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    // 根据id 查找图书 累加count
    const {id} = ctx.request.query
    await mysql('books')
            .where('id', id)
            .increment('count', 1)
}