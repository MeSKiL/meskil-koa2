const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
    constructor(level) {
        this.level = level || 1
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
                if (decode.scope < this.level) {
                    errMsg = '权限不足'
                    throw new Error()
                }
                ctx.auth = {
                    uid: decode.uid,
                    scope: decode.scope
                }
            } catch (e) {
                if (e.name === 'TokenExpiredError') {
                    errMsg = 'token已过期'
                }
                throw new global.errs.Forbidden(errMsg)
            }
            await next()
        }
    }

    static verifyToken(token){
        try{
            jwt.verify(token, global.config.security.secretKey)
            return true
        }catch (e) {
            return false
        }
    }
}

module.exports = {
    Auth
}