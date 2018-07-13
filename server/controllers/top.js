const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    // 根据访问量count 降序查找9个图书数据并返回 图书的id, title, image, count
    const top = await mysql('books')
                .select('id', 'title', 'image', 'count')
                .orderBy('count', 'desc')
                .limit(9)
    ctx.state.data = {
        list: top
    }
}