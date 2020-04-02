const {sequelize} = require('@core/db')
const {DataTypes, Model} = require('sequelize')
const {Art} = require('./art')
const {Favor} = require('./favor')

class Flow extends Model {
    static async getLatest(uid) {
        const flow = await Flow.findOne({ // 根据index倒序排列
            order: [
                ['index', 'DESC']
            ]
        })
        return Flow.getArtByFlow(flow, uid)
    }

    static async getNext(uid, index) {
        const flow = await Flow.findOne({
            where: {
                index: index + 1
            }
        })
        if (!flow) {
            throw new global.errs.NotFound()
        }
        return Flow.getArtByFlow(flow, uid)
    }

    static async getPrevious(uid, index) {
        const flow = await Flow.findOne({
            where: {
                index: index - 1
            }
        })
        if (!flow) {
            throw new global.errs.NotFound()
        }
        return Flow.getArtByFlow(flow, uid)
    }

    static async getArtByFlow(flow, uid) {
        const art = await new Art(flow.artId, flow.type).getData()
        const like = await Favor.userLikeIt(flow.artId, flow.type, uid)
        art.setDataValue('index', flow.index)
        art.setDataValue('likeStatus', like)
        return art
    }
}

Flow.init({
    index: DataTypes.INTEGER,
    artId: DataTypes.INTEGER,
    type: DataTypes.INTEGER
    // type:100 movie
    // type:200 music
    // type:300 sentence
}, {
    sequelize,
    tableName: 'flow'
})

module.exports = {
    Flow
}