const Router = require('koa-router')
const {RegisterValidator} = require('../../validators/validator')
const {User} = require('../../models/user')
const {success} = require('../../lib/helper')

const router = new Router({
    prefix: '/v1/user'
})
router.post('/register', async (ctx) => {
    const v = await (new RegisterValidator()).validate(ctx) // 自定义方法存在异步可能性，validate必须是独立的，所以不能用中间件实现
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password1'),
        nickname: v.get('body.nickname')
    }
    await User.create(user)
    success()
})

module.exports = {
    router
}