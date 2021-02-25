import { URL_FAIL, URL_REQUEST, URL_SUCCESS } from "../actionTypes/urlActionTypes"

export const urlDataReducer = (state = {}, action) => {
    switch (action.type) {
        case URL_REQUEST:
            return { loading: true }
        case URL_SUCCESS:
            return { loading: false, urlData: action.payload }
        case URL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}