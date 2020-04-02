const {HttpException} = require('../core/http-exception')
const {HTTP_STATUS, ERROR_CODE} = require('../common/const')
const catchError = async (ctx, next) => {
    // 面向切面编程
    try {
        await next()
    } catch (e) {
        const isHttpException = e instanceof HttpException
        const isDev = global.config.environment === 'dev'
        if (isDev && !isHttpException) {
            throw e
        }
        if (isHttpException) {
            ctx.body = {
                msg: e.msg,
                errorCode: e.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = e.code
        } else {
            ctx.body = {
                msg: '系统异常,请联系管理员',
                errorCode: ERROR_CODE.SYSTEM_EXCEPTION,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = HTTP_STATUS.SYSTEM_EXCEPTION
        }
    }
}

module.exports = {catchError}