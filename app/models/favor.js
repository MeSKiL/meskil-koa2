const {sequelize} = require('@core/db')
const {Sequelize, DataTypes, Model, Op} = require('sequelize')
const {Art, ArtCollection} = require('./art')
const {ART_TYPE} = require('@common/const')

class Favor extends Model {
    static async like(artId, type, uid) {
        const favor = await Favor.findOne({
            where: {
                artId,
                type,
                uid
            }
        })
        if (favor) {
            throw new global.errs.LikeError()
        }
        return sequelize.transaction(async t => { // 事务
            await Favor.create({
                artId,
                type,
                uid
            }, {transaction: t})
            const art = await new Art(artId, type).getData(false)
            if (!art) {
                throw new global.errs.NotFound('点赞资源不存在')
            }
            await art.increment('fav_nums', {by: 1, transaction: t})
        })
    }

    static async dislike(artId, type, uid) {
        const favor = await Favor.findOne({
            where: {
                artId,
                type,
                uid
            }
        })
        if (!favor) {
            throw new global.errs.DislikeError()
        }
        return sequelize.transaction(async t => { // 事务
            await favor.destroy({
                force: true, // 物理删除
                transaction: t
            })
            const art = await new Art(artId, type).getData(false)
            if (!art) {
                throw new global.errs.NotFound('取消点赞资源不存在')
            }
            await art.decrement('fav_nums', {by: 1, transaction: t})
        })
    }

    static async userLikeIt(artId, type, uid) {
        const res = await Favor.findOne({
            where: {
                artId,
                type,
                uid
            }
        })
        return !!res
    }

    static async getMyClassicFavors(uid) {
        const classicFavors = await Favor.findAll({
            uid,
            type: {
                [Op.not]: 400
            }
        })
        if (!classicFavors) {
            throw new global.errs.NotFound()
        }
        return new ArtCollection(classicFavors).getList()
    }

    static async getCountByIds(ids) { // 获取传入的ids的点赞数量
        return Favor.findAll({
            where: {
                artId: {
                    [Op.in]: ids,
                    type: ART_TYPE.BOOK
                }
            },
            group: ['artId'],
            attributes: ['artId', [Sequelize.fn('COUNT', '*'), 'count']]
        })
    }

    static getMyFavorBookCount(uid) {
        return Favor.count({
            where: {
                type: ART_TYPE.BOOK,
                uid
            }
        })
    }

    static async getBookFavor(uid, bookId) {
        const [favorNums, likeStatus] = await Promise.all([Favor.count({
            where: {
                artId: bookId,
                uid
            }
        }), Favor.userLikeIt(bookId, ART_TYPE.BOOK, uid)])
        return {
            favNums: favorNums,
            likeStatus
        }
    }
}

Favor.init({
    uid: DataTypes.INTEGER,
    artId: DataTypes.INTEGER,
    type: DataTypes.INTEGER
}, {
    sequelize,
    tableName: 'favor'
})

module.exports = {
    Favor
}