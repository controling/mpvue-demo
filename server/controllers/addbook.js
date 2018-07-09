const https = require('https')
// 获取当前环境下的mysql实例
const {mysql} = require('../qcloud')

// 新增图书
// 1. 获取豆瓣信息
// https://api.douban.com/v2/book/isbn/
// 2. 入库

module.exports = async (ctx) => {
    const {isbn, openId} = ctx.request.body
    if(isbn && openId){
        // 查询数据库是否已经存在数据
        const findRes = await mysql('books').select().where('isbn', isbn)
        if(findRes.length){
            ctx.state = {
                code: -1,
                data: {
                    msg: '图书已存在'
                }
            }
            return
        }

        let url = 'https://api.douban.com/v2/book/isbn/' + isbn

        // 获取图书信息
        const bookinfo = await getJSON(url)

        const rate = bookinfo.rating.average
        const {title, image, alt, publisher, summary, price} = bookinfo 
        const tags = bookinfo.tags.map(v => {
            return `${v.title} ${v.count}`
        }).join(',')
        const author = bookinfo.author.join(',')
        console.log({
            isbn, openId, rate, title, image, alt, publisher, summary, price, tags, author
        })
        // 图书数据插入数据库
        try{
            await mysql('books').insert({
                isbn, openId, rate, title, image, alt, publisher, summary, price, tags, author
            })
            ctx.state.data = {
                title,
                msg: 'success'
            }
        }catch(e){
            ctx.state = {
                code: -1,
                data: {
                    msg: '新增失败:' + e.sqlMessage
                }
            }
        }
       
    }
}

function getJSON(url){
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let urlData = ''
            res.on('data', data => {
                urlData += data
            })
            res.on('end', data => {
                const bookinfo = JSON.parse(urlData)
                if(bookinfo.title){
                    resolve(bookinfo)
                }else{
                    reject(bookinfo)
                }
            })
        })
    })
}