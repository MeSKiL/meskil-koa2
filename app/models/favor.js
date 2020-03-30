const {sequelize} = require('@core/db')
const {DataTypes, Model} = require('sequelize')
const {Art} = require('./art')

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
            const art = await Art.getData(artId, type)
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
            const art = await Art.getData(artId, type)
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