const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    // 连表查询
    //books.*    books表下面所有的数据

    const {page} = ctx.request.query
    const size = 10
    const books = await mysql('books')
                    .select('books.*', 'cSessionInfo.user_info')
                    .join('cSessionInfo', 'books.openId', 'cSessionInfo.open_id')
                    .limit(size)
                    .offset(Number(page) * size)
                    .orderBy('books.id', 'desc')
    // .orderBy('id', 'desc')
    ctx.state.data = {
        list: books.map(v => {
            const info = JSON.parse(v.user_info)
            // user_info的信息只获取nickName
            return Object.assign({}, v, {
                user_info: {
                    nickName: info.nickName
                }
            })
        })
    }
}
