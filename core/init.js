const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
    static initCore(app) {
        InitManager.initLoadRouters(app)
        InitManager.loadHttpException()
        InitManager.loadConfig()
    }

    static loadConfig(path = '') {
        const configPath = path || process.cwd() + '/config/config.js'
        global.config = require(configPath)
    }

    static initLoadRouters(app) {
        const apiDirectory = `${process.cwd()}/app/api`
        requireDirectory(module, apiDirectory, {visit: whenLoadModule})

        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                app.use(obj.routes())
            } else { // 兼容{routers的情况}
                for (let r of Object.values(obj)) {
                    if (r instanceof Router) {
                        app.use(r.routes())
                    }
                }
            }
        }
    }

    static loadHttpException() {
        global.errs = require('./http-exception')
    }
}

module.exports = InitManager
