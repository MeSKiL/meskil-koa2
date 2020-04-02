const {DataTypes, Model} = require('sequelize')

const {sequelize} = require('@core/db')

class HotBook extends Model {
    static async getAll() {
        const {Favor} = require('./favor')
        const books = await HotBook.findAll({
            order: [
                'index'
            ]
        })
        const bookIds = books.map(book => {
            return book.id
        })
        const favors = await Favor.getCountByIds(bookIds)
        books.forEach(book => {
            let favor = favors.find(favor => {
                return book.id === favor.artId
            })
            book.setDataValue('favNums', favor ? favor.get('count') : 0)
        })
        return books
    }

    static _getEachBookStatus(book, favors) {
        let count = 0
        favors.forEach(favor => {
            if (book.id === favor.artId) {
                count = favor.get('count')
            }
        })

    }
}

HotBook.init({
    // id: {
    //     type:DataTypes.INTEGER,
    //     primaryKey:true
    // },
    index: DataTypes.INTEGER,
    image: DataTypes.STRING,
    author: DataTypes.STRING,
    title: DataTypes.STRING
}, {
    sequelize,
    tableName: 'hot_book'
})

module.exports = {
    HotBook
}