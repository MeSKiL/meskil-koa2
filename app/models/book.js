const {DataTypes, Model} = require('sequelize')
const axios = require('axios')
const {sequelize} = require('@core/db')
const urls = require('../../config/urls')

class Book extends Model {
    static getDetail(id) {
        return axios.get(`${urls.YU_SHU_DETAIL}/${id}`)
    }

    static async searchFromYuShu(q, start, count, summary = 1) {
        return axios.get(urls.YU_SHU_KEYWORD, {
            params: {
                q, start, count, summary
            }
        })
    }
}

Book.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    favNums: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: 'book'
})

module.exports = {
    Book
}