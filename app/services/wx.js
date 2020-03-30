const util = require('util')
const axios = require('axios')
const urls = require('../../config/urls')
const {User} = require('@models/user')
const {generateToken} = require('@core/util')
const {USER_AUTHORITY} = require('@common/const')

class WXManager {
    static async codeToToken(code) {
        // code换取openId
        const res = await axios.get(urls.WX_LOGIN_URL, {
            params: {
                appid: global.config.wx.appId,
                secret: global.config.wx.appSecret,
                js_code: code,
                grant_type: 'authorization_code'
            }
        })
        if (res.status !== 200) {
            throw new global.errs.AuthFailed('openId获取失败')
        }
        const {data:{errcode}} = res
        if (errcode) {
            throw new global.errs.AuthFailed('openId获取失败:' + res.data.errmsg)
        }
        const {data: {openid}} = res
        let user = await User.getUserByOpenid(openid)
        if (!user) {
            user = await User.registerByOpenid(openid)
        }
        return generateToken(user.id, USER_AUTHORITY.NORMAL)
    }
}

module.exports = {
    WXManager
}