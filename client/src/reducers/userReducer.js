import { RESET_ERROR, RESET_PROFILE, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS } from "../actionTypes/userActionTypes"

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case RESET_ERROR:
            return { loading: false, error: null }
        case USER_LOGOUT:
            return {}
        default:
            return state;
    }
}
export const userDataReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return { loading: true }
        case USER_PROFILE_SUCCESS:
            return { loading: false, userData: action.payload }
        case USER_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        case RESET_PROFILE:
            return { loading: false, error: null, userProfile: {} }
        default:
            return state;
    }
}
