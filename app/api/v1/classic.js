const Router = require('koa-router')
const {Auth} = require('@middlewares/auth')
const {USER_AUTHORITY} = require('@common/const')
const {Flow} = require('@models/flow')
const {success} = require('@lib/helper')
const router = new Router({
    prefix: '/v1/classic'
})
router.get('/latest', new Auth(USER_AUTHORITY.NORMAL).m, async (ctx, next) => {
    ctx.body = success(await Flow.getLatest(ctx.auth.uid))
})

module.exports = {router}