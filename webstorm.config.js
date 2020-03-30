const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    context: path.resolve(__dirname, './'),
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            "@root": resolve("."),
            "@models": resolve("app/models"),
            "@lib": resolve("app/lib"),
            "@validators": resolve("app/validators"),
            "@services": resolve("app/services"),
            "@common": resolve("common"),
            "@middlewares": resolve("middlewares"),
            "@core": resolve("core")
        }
    }
}