const {HTTP_STATUS, ERROR_CODE} = require('../common/const')

class HttpException extends Error {
    constructor(msg, errorCode, code) {
        super();
        this.errorCode = errorCode
        this.code = code
        this.msg = msg
    }
}

class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super(msg || '参数错误', errorCode || 10000, HTTP_STATUS.PARAMETER_EXCEPTION);
    }
}

class Success extends HttpException {
    constructor(msg, errorCode) {
        super(msg || 'ok', errorCode || ERROR_CODE.SUCCESS, HTTP_STATUS.ADD_ACTION_SUCCESS);
    }
}

class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super(msg || '资源未找到', errorCode || ERROR_CODE.NORMAL_ERROR, HTTP_STATUS.NOT_FOUND);
    }
}

class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super(msg || '授权失败', errorCode || ERROR_CODE.AUTH_FAILED, HTTP_STATUS.AUTH_FAILED);
    }
}

class Forbidden extends HttpException {
    constructor(msg, errorCode) {
        super(msg || '禁止访问', errorCode || ERROR_CODE.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
    }
}

class LikeError extends HttpException {
    constructor(msg, errorCode) {
        super(msg || '你已经点赞过', errorCode || ERROR_CODE.HAVE_LIKED, HTTP_STATUS.PARAMETER_EXCEPTION);
    }
}

class DislikeError extends HttpException {
    constructor(msg, errorCode) {
        super(msg || '你已取消点赞', errorCode || ERROR_CODE.HAVE_DISLIKED, HTTP_STATUS.PARAMETER_EXCEPTION);
    }
}

module.exports = {
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed,
    Forbidden,
    LikeError,
    DislikeError
}