const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/book'
})
const {HotBook} = require('@models/hot-book')
const {Book} = require('@models/book')
const {Favor} = require('@models/favor')
const {Comment} = require('@models/book-comment')
const {PositiveIntegerValidator, SearchValidator, AddShortCommentValidator} = require('@validators/validator')
const {Auth} = require('@middlewares/auth')
const {success} = require('@lib/helper')

router.get('/hot_list', async (ctx, next) => {
    const favors = await HotBook.getAll()
    ctx.body = {
        books: favors
    }
})

router.get('/:id/detail', async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx)
    const book = await Book.getDetail(v.get('path.id'))
    ctx.body = success(book.data)
})

router.get('/search', async (ctx, next) => {
    const v = await new SearchValidator().validate(ctx)
    const result = await Book.searchFromYuShu(v.get('query.q'), v.get('query.start'), v.get('query.count'))
    ctx.body = success(result.data)
})

router.get('/favor/count', new Auth().m, async (ctx, next) => {
    const count = await Favor.getMyFavorBookCount(ctx.auth.uid)
    ctx.body = success({
        count
    })
})

router.get('/:bookId/favor', new Auth().m, async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'bookId'
    })
    ctx.body = success(await Favor.getBookFavor(ctx.auth.uid, v.get('path.bookId')))
})

router.post('/add/short_comment', new Auth().m, async (ctx, next) => {
    const v = await new AddShortCommentValidator().validate(ctx, {
        id: 'bookId'
    })
    await Comment.addComment(v.get('body.bookId'), v.get('body.content'))
    ctx.body = success()
})

router.get('/:bookId/short_comment', new Auth().m, async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'bookId'
    })
    ctx.body = success(await Comment.getComments(v.get('path.bookId')))
})

router.get('/hot_keyword',async (ctx,next)=>{
    ctx.body = success({
        hot:[
            'Python',
            '哈利波特',
            '村上春树',
            '东野圭吾',
            '白夜行',
            '韩寒',
            '金庸',
            '王小波'
        ]
    })
})

module.exports = {router}