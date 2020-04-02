const {Op} = require('sequelize')
const {ART_TYPE} = require('@common/const')
const {Movie, Music, Sentence} = require('./classic')
const {Book} = require('./book')

class ArtCollection {
    constructor(artInfoList) {
        this.artInfoList = artInfoList
    }

    async getList() {
        const artInfoObj = {
            [ART_TYPE.MOVIE]: [],
            [ART_TYPE.MUSIC]: [],
            [ART_TYPE.SENTENCE]: []
        }
        this.artInfoList.forEach(item => {
            if (item.type !== ART_TYPE.BOOK) {
                artInfoObj[item.type].push(item.artId)
            }
        })
        let arts = []
        for (let [key, value] of Object.entries(artInfoObj)) {
            if (!value.length) {
                continue
            }
            const arr = await Art._getListByType(value, Number(key))
            arts = arts.concat(arr)
        }
        return arts
    }
}

class Art {
    constructor(artId, type) {
        this.artId = artId
        this.type = type
    }

    async getDetail(uid) {
        const art = await this.getData(this.artId, this.type)
        if (!art) {
            throw new global.errs.NotFound()
        }
        const {Favor} = require('./favor')
        return {
            art,
            likeStatus: await Favor.userLikeIt(this.artId, this.type, uid)
        }
    }

    async getData(useScope = true) {
        const finder = {
            where: {
                id: this.artId
            }
        }
        const scope = useScope ? 'filter' : null
        if (this.type === ART_TYPE.MOVIE) {
            return Movie.scope(scope).findOne(finder)
        } else if (this.type === ART_TYPE.MUSIC) {
            return Music.scope(scope).findOne(finder)
        } else if (this.type === ART_TYPE.SENTENCE) {
            return Sentence.scope(scope).findOne(finder)
        } else if (this.type === ART_TYPE.BOOK) {
            const {
                Book
            } = require('./book')
            let book = await Book.scope(scope).findOne(finder)
            if (!book) {
                return Book.create({
                    id: this.artId
                })
            } else {
                return book
            }
        } else {
            return null
        }
    }

    static _getListByType(ids, type) {
        const finder = {
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        }
        const scope = 'filter'
        if (type === ART_TYPE.MOVIE) {
            return Movie.scope(scope).findAll(finder)
        } else if (type === ART_TYPE.MUSIC) {
            return Music.scope(scope).findAll(finder)
        } else if (type === ART_TYPE.SENTENCE) {
            return Sentence.scope(scope).findAll(finder)
        } else if (type === ART_TYPE.BOOK) {
            return Book.scope(scope).findAll(finder)
        } else {
            return null
        }
    }
}

module.exports = {
    Art, ArtCollection
}