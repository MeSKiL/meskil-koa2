const Router = require('koa-router')
const {Auth} = require('@middlewares/auth')
const {USER_AUTHORITY} = require('@common/const')
const {Flow} = require('@models/flow')
const {Favor} = require('@models/favor')
const {Art} = require('@models/art')
const {success} = require('@lib/helper')
const {PositiveIntegerValidator, ClassicValidator} = require('@validators/validator')
const router = new Router({
    prefix: '/v1/classic'
})
router.get('/latest', new Auth(USER_AUTHORITY.NORMAL).m, async (ctx, next) => { // 最新一期
    ctx.body = success(await Flow.getLatest(ctx.auth.uid))
})

router.get('/:index/next', new Auth().m, async (ctx, next) => { // 下一期
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    })
    const index = v.get('path.index')
    ctx.body = success(await Flow.getNext(ctx.auth.uid, index))
})


router.get('/:index/previous', new Auth().m, async (ctx, next) => { // 上一期
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    })
    const index = v.get('path.index')
    ctx.body = success(await Flow.getPrevious(ctx.auth.uid, index))
})

router.get('/:type/:id', new Auth().m, async (ctx, next) => { // 获取classic详情
    const v = await new ClassicValidator().validate(ctx)
    const id = v.get('path.id')
    const type = Number(v.get('path.type'))

    const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)
    ctx.body = success({
        ...artDetail.art.dataValues,
        likeStatus: artDetail.likeStatus
    })
})

router.get('/:type/:id/favor', new Auth().m, async (ctx, next) => { // 获取点赞数量
    const v = await new ClassicValidator().validate(ctx)
    const id = v.get('path.id')
    const type = Number(v.get('path.type'))
    const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)
    ctx.body = success({
        favNums: artDetail.art.favNums,
        likeStatus: artDetail.likeStatus
    })
})

router.get('/favor', new Auth().m, async (ctx, next) => {
    ctx.body = success(await Favor.getMyClassicFavors(ctx.auth.uid))
})

module.exports = {router}