const Router = require('koa-router')
const errors = require('../../../core/http-exception')
const {PositiveIntegerValidator} = require('../../validators/validator')
const {Auth} = require('../../../middlewares/auth')
const router = new Router({
    prefix: '/v1/classic'
})
router.get('/latest', new Auth().m, async (ctx, next) => {
    ctx.body = ctx.auth.uid
})

module.exports = {router}