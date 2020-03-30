const {ERROR_CODE} = require('@common/const')

function success(data = null) {
    return {
        error_code: ERROR_CODE.SUCCESS,
        data,
        msg: 'ok'
    }
}

module.exports = {success}