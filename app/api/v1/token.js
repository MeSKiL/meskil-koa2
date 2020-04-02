const Router = require('koa-router')
const {TokenValidator, NotEmptyValidator} = require('@validators/validator')
const {LOGIN_TYPE, USER_AUTHORITY} = require('@common/const')
const {User} = require('@models/user')
const {generateToken} = require('@core/util')
const {WXManager} = require('@services/wx')
const {Auth} = require('@middlewares/auth')
const {success} = require('@lib/helper')
const router = new Router({
    prefix: '/v1/token'
})

router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx)
    let token
    switch (v.get('body.type')) {
        case LOGIN_TYPE.USER_MINI_PROGRAM:
            token = await WXManager.codeToToken(v.get('body.account'))
            break
        case LOGIN_TYPE.USER_EMAIL:
            token = await emailLogin(v.get('body.account'), v.get('body.secret'))
            break
        default:
            throw new global.errs.ParameterException('没有相应的处理函数')
    }
    ctx.body = success(token)
})

router.post('/verify', async (ctx) => {
    const v = await new NotEmptyValidator().validate(ctx)
    const result = Auth.verifyToken(v.get('header.token'))
    ctx.body = success({isValid:result})
})

async function emailLogin(account, secret) {
    const user = await User.verifyEmailPassword(account, secret)
    return generateToken(user.id, USER_AUTHORITY.NORMAL)
}

module.exports = {
    router
}