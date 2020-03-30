const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
    constructor() {
    }

    get m() {
        return async (ctx, next) => {
            // ctx.req是nodejs原生的request对象 ctx.request是koa2封装后的request对象
            const userToken = basicAuth(ctx.req)
            let errMsg = 'token不合法'
            if (!userToken || !userToken.name) {
                throw new global.errs.Forbidden(errMsg)
            }
            try {
                const decode = jwt.verify(userToken.name, global.config.security.secretKey)
                ctx.auth = {
                    uid: decode.uid,
                    scope: decode.scope
                }
                await next()
            } catch (e) {
                if (e.name === 'TokenExpiredError') {
                    errMsg = 'token已过期'
                }
                throw new global.errs.Forbidden(errMsg)
            }
        }
    }
}

module.exports = {
    Auth
}