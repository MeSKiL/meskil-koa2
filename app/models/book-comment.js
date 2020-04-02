const {DataTypes, Model} = require('sequelize')
const {sequelize} = require('@core/db')

class Comment extends Model {
    static async addComment(bookId, content) {
        const comment = await Comment.findOne({
            where: {
                bookId,
                content
            }
        })
        if (!comment) {
            return Comment.create({
                bookId,
                content,
                nums: 1
            })
        } else {
            return comment.increment('nums', {
                by: 1
            })
        }
    }

    static async getComments(bookId) {
        return Comment.findAll({
            where: {
                bookId
            }
        })
    }
}

Comment.init({
    content: DataTypes.STRING(12),
    nums: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    bookId: DataTypes.INTEGER
}, {
    sequelize,
    tableName: 'comment'
})

module.exports = {Comment}
