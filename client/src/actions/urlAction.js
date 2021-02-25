import axios from "axios";
import { URL_REQUEST, URL_SUCCESS, URL_FAIL, DELETE_URL } from "../actionTypes/urlActionTypes";
import { USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS } from "../actionTypes/userActionTypes";

export const addUrl = (url, expectedResponseTime) => async (dispatch, getState) => {

    const { user: { userInfo } } = getState()
    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    await axios.post('http://localhost:5001/api/url', { url, expectedResponseTime }, config);

    dispatch({
        type: USER_PROFILE_REQUEST
    })
    const { data } = await axios.get('http://localhost:5001/api/user', config);
    dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: data
    })


}
export const getUrlData = (id) => async (dispatch, getState) => {

    try {

        dispatch({
            type: URL_REQUEST
        })

        const { user: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        let { data } = await axios.get('http://localhost:5001/api/url/' + id, config);
        dispatch({
            type: URL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: URL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })



    }

}

export const deleteUrl = (id) => async (dispatch, getState) => {

    try {

        dispatch({
            type: DELETE_URL
        })

        const { user: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete('http://localhost:5001/api/url/' + id, config);

        dispatch({
            type: USER_PROFILE_REQUEST
        })
        const { data } = await axios.get('http://localhost:5001/api/user', config);
        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data
        })
    } catch (error) {
        console.log(error.response && error.response.data.message ? error.response.data.message : error.message)

    }

}

