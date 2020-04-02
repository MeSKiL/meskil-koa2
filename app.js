require('module-alias/register')

const Koa = require('koa')
const path = require('path')
const parser = require('koa-bodyparser')
const InitManager = require('./core/init')
const {catchError} = require('./middlewares/exception')
const koaStatic = require('koa-static')

const app = new Koa()

app.use(catchError) // 全局捕捉错误
app.use(parser())
app.use(koaStatic(path.join(__dirname,'./static')))

InitManager.initCore(app)

app.listen(3000)