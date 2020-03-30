module.exports = {
    // 环境变量
    environment: 'dev',
    database: {
        dbName: 'island',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'yg5891822',
        define: {}
    },
    security: {
        secretKey: 'abcdefg',
        expiresIn: 60 * 60 * 24 *30
    },
    wx:{
        appId:'wxf65a1cca099d35e6',
        appSecret:'769f8d951b103399e314f91b6153dda3',
    }
}
