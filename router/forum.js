const Router = require('koa-router')
const path = require('path')
const fs = require('fs')

const router = Router({
    prefix: '/forum'
})

let ff = require(path.join(__dirname, '../entity/images.js'))

/*
 * 获取文件
 */
router.post('/', async (ctx, next) => {
    let filename = ctx.request.body.filename
    let file = fs.readFileSync(filename)
    ctx.body = file
    await next()
})


module.exports = router
