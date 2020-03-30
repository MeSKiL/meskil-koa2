require('module-alias/register')

const Koa = require('koa')
const parser = require('koa-bodyparser')
const InitManager = require('./core/init')
const {catchError} = require('./middlewares/exception')
const app = new Koa()

app.use(catchError) // 全局捕捉错误
app.use(parser())

InitManager.initCore(app)

app.listen(3000)