import { APISERVICE, config } from "../../utils"

export const authRegister = (data) => (dispatch) => {
    APISERVICE().post('/auth/register', data)
        .then((response) => {
            dispatch({
                type: 'AUTH_REGISTER_SUCCESS',
                payload: {
                    message: response?.data?.message
                }
            })
        })
        .catch((err) => {
            dispatch({
                type: 'AUTH_REGISTER_FAIL',
                payload: {
                    error: err?.response?.data
                }
            })
        })
}
export const authLogin = (data) => (dispatch) => {
    APISERVICE().post('/auth/login', data)
        .then((response) => {
            dispatch({
                type: 'AUTH_LOGIN_SUCCESS',
                payload: {
                    message: response?.data?.message,
                    token: response?.data?.token
                }
            })
            window.location.href= "/"
        })
        .catch((err) => {
            dispatch({
                type: 'AUTH_LOGIN_FAIL',
                payload: {
                    error: err?.response?.data
                }
            })
        })
}

export const fetchProfile = (token) => (dispatch) => {
    APISERVICE().get('/auth/me', config(token))
        .then((response) => {
            dispatch({
                type: 'AUTH_PROFILE_SUCCESS',
                payload: {
                    data: response.data
                }
            })
        })
        .catch((err) => {
            if (err.response.status === 401) {
                window.location.href = '/login'
            }
            dispatch({
                type: 'AUTH_PROFILE_FAIL',
                payload: {
                    err: err.response
                }
            })
        })
}