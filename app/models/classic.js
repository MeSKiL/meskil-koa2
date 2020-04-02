const {sequelize} = require('@core/db')
const {Model, DataTypes} = require('sequelize')

const classicFields = {
    image: {
        type: DataTypes.STRING,
        get() {
            return global.config.host + this.getDataValue('image')
        }
    },
    content: DataTypes.STRING,
    pubdate: DataTypes.DATEONLY,
    favNums: {
        type: DataTypes.INTEGER,
        default: 0
    },
    title: DataTypes.STRING,
    type: DataTypes.TINYINT,
}

class Movie extends Model {

}

Movie.init(classicFields, {
    sequelize,
    tableName: 'movie'
})

class Sentence extends Model {

}

Sentence.init(classicFields, {
    sequelize,
    tableName: 'sentence'
})

class Music extends Model {

}

Music.init(Object.assign({url: DataTypes.STRING}, classicFields), {sequelize, tableName: 'music'})

module.exports = {
    Movie, Music, Sentence
}
