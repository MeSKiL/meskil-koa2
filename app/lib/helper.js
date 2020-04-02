const {ERROR_CODE} = require('@common/const')

function success(data = null) {
    return {
        errorCode: ERROR_CODE.SUCCESS,
        data,
        msg: 'ok'
    }
}

module.exports = {success}