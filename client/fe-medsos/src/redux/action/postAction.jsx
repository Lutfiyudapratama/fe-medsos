import { APISERVICE, config } from "../../utils"

export const fetchPosting = (token) => (dispatch) => {
    dispatch({ type: 'POST_INIT' })
    APISERVICE().get('/Post/list', config(token))
        .then((response) => {
            dispatch({
                type: 'POST_SUCCESS',
                payload: {
                    data: response?.data?.data
                }
            })
        })
        .catch((err) => {
            if (err?.response?.status === 401) {
                window.location.href = '/login'
            }
            dispatch({
                type: 'POST_FAIL',
                payload: {
                    err: err.response
                }
            })
        })
}
export const storePosting = (token) => (dispatch) => {
    dispatch({ type: 'POST_INIT' })
    APISERVICE().post('/Post/create', config(token))
        .then((response) => {
            dispatch({
                type: 'POST_MESSAGE_SUCCESS',
                payload: {
                    message: response?.data?.message
                }
            })
        })
        .catch((err) => {
            if (err?.response?.status === 401) {
                window.location.href = '/login'
            }
            dispatch({
                type: 'POST_FAIL',
                payload: {
                    err: err.response
                }
            })
        })
}