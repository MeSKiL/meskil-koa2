const HTTP_STATUS = {
    ADD_ACTION_SUCCESS: 201,
    PARAMETER_EXCEPTION: 400,
    AUTH_FAILED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SYSTEM_EXCEPTION: 500
}

const ERROR_CODE = {
    SUCCESS: 0,
    SYSTEM_EXCEPTION: 999,
    NORMAL_ERROR: 10000,
    AUTH_FAILED: 10004,
    FORBIDDEN: 10006,
    HAVE_LIKED:60001,
    HAVE_DISLIKED:60002
}

const LOGIN_TYPE = {
    USER_MINI_PROGRAM: 100,
    USER_EMAIL: 101,
    USER_MOBILE: 102,
    ADMIN_EMAIL: 200,
    isThisType
}

const USER_AUTHORITY = {
    NORMAL: 8,
    ADMIN: 16
}

const ART_TYPE = {
    MOVIE:100,
    MUSIC:200,
    SENTENCE:300,
    BOOK:400,
    isThisType
}

function isThisType(val) {
    for (let key in this) {
        if (this[key] == val) {
            return true
        }
    }
    return false
}

module.exports = {HTTP_STATUS, ERROR_CODE, LOGIN_TYPE, USER_AUTHORITY,ART_TYPE, isThisType}