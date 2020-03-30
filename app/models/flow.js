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
        const art = await Art.getData(flow.artId, flow.type)
        const likeLatest = await Favor.userLikeIt(flow.artId, flow.type, uid)
        art.setDataValue('index', flow.index)
        art.setDataValue('like_status', likeLatest)
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