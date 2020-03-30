const {Model, DataTypes} = require('sequelize')
const bcrypt = require('bcryptjs')
const {sequelize} = require('../../core/db')

class User extends Model { // 不允许加构造器
    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            throw new global.errs.AuthFailed('用户不存在')
        }
        console.log(user.password)
        const correct = bcrypt.compareSync(plainPassword, user.dataValues.password)
        if(!correct){
            throw new global.errs.AuthFailed('密码错误')
        }
        return user
    }
}

User.init({
    // 主键 不能重复 不能为空
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // 主键
        autoIncrement: true
    },
    nickname: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        set(val) { // 赋值password时，自动会执行set代码
            const salt = bcrypt.genSaltSync(10) // 10是成本
            const psw = bcrypt.hashSync(val, salt) // 相同的密码加密出来也是不同的
            this.setDataValue('password', psw)
        }
    },
    openId: {
        type: DataTypes.STRING(64),
        unique: true // 唯一
    }
}, {
    sequelize,
    tableName: 'user'
})

module.exports = {
    User
}