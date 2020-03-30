const Router = require('koa-router')
const {TokenValidator} = require('../../validators/validator')
const {LOGIN_TYPE} = require('../../../common/const')
const {User} = require('../../models/user')
const {generateToken} = require('../../../core/util')
const router = new Router({
    prefix: '/v1/token'
})

router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx)
    let token
    switch (v.get('body.type')) {
        case LOGIN_TYPE.USER_MINI_PROGRAM:
            break
        case LOGIN_TYPE.USER_EMAIL:
            token = await emailLogin(v.get('body.account'), v.get('body.secret'))
            break
        default:
            throw new global.errs.ParameterException('没有相应的处理函数')
    }
    ctx.body = {
        token
    }
})

async function emailLogin(account, secret) {
    const user = await User.verifyEmailPassword(account, secret)
    return generateToken(user.id, 2)
}

module.exports = {
    router
}