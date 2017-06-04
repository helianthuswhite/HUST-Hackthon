const Koa = require('koa')
const SocketIO = require('socket.io')
const fs = require('fs')
const path = require('path')
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const server = require('http').createServer(app.callback())
const SocketEntity = require(path.join(__dirname, '../entity/Socket.js'))
SocketEntity.io = SocketIO(server)

const files = fs.readdirSync(path.join(__dirname, '../router')).filter(v => !v.includes('swp'))
const routers = files.map(v => require(path.join(__dirname, '../router', v)))

const publicFiles = serve(path.join(__dirname, '../public'));
publicFiles._name = 'static /public';
app.use(publicFiles);
app.use(bodyParser())

for (let i = 0; i < routers.length; i++) {
    app.use(routers[i].routes(), routers[i].allowedMethods())
}

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Credentials', 'true')
    await next()
})

const ffs = require(path.join(__dirname, '../entity/images.js'))


server.listen(3000)
console.log('http://localhost:3000')
