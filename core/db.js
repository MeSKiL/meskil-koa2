const {Sequelize} = require('sequelize')
const {dbName, host, port, user, password} = require('../config/config').database
const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: true,
    timezone: '+08:00',
    define: {
        timestamps: true, // create_time update_time
        paranoid: true, // delete_time
        // createdAt: 'created_at',
        // updatedAt: 'updated_at',
        // deletedAt: 'deleted_at',
        underscored: true, // 所有驼峰改成下划线
    }
})

sequelize.sync({
    // true则自动删除原有表重新创建
})

module.exports = {
    sequelize
}