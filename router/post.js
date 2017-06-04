const Router = require('koa-router')
const path = require('path')
const fs = require('fs')

const SocketEntity = require(path.join(__dirname, '../entity/Socket.js'))
const Images = require(path.join(__dirname, '../entity/images.js'))

SocketEntity.io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ', msg)
    })
})

const router = Router({
    prefix: '/post'
})

/*
 * 拿到所有文件名
 */
router.get('/:num', async (ctx, next) => {
    let num = ctx.request.num
    ctx.body = Images.files.slice(0, num)
    await next()
})

/*
 * 需要的文件 {filename: 'name'}
 * 提醒客户端文件名
 */
router.post('/', async (ctx, next) => {
    let body = ctx.request.body
    let filename = body.filename
    let file = fs.readFileSync(filename)
    fs.writeFileSync(path.join(__dirname, '../public/', path.basename(filename)), file)
    SocketEntity.io.emit('notice', {filename: path.basename(filename)})
    ctx.body = {ok: 1}
    await next()
})

module.exports = router
