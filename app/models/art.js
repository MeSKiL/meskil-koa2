const {ART_TYPE} = require('@common/const')
const {Movie,Music,Sentence} = require('./classic')
class Art{
    static async getData(artId,type){
        let art = null
        const finder = {
            where:{
                id:artId
            }
        }
        switch (type) {
            case ART_TYPE.MOVIE:
                art = await Movie.findOne(finder)
                break
            case ART_TYPE.MUSIC:
                art = await Music.findOne(finder)
                break
            case ART_TYPE.SENTENCE:
                art = await Sentence.findOne(finder)
                break
            case ART_TYPE.BOOK:
                break
            default:
                break
        }
        return art
    }
}

module.exports = {
    Art
}