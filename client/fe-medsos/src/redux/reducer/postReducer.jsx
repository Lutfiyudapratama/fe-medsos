
const init = {
    load: true,
    data: [],
    message: null,
    err: null
}

const postReducer = (state = init, action) => {
    switch (action?.type) {
        case 'POST_INIT':
            return init
        case 'POST_SUCCESS':
            return {
                ...state,
                data: action?.payload?.data
            } 
            case 'POST_MESSAGE_SUCCESS':
            return {
                ...state,
                message: action?.payload?.message
            }
        case 'POST_FAIL':
            return {
                ...state,
                err: action?.payload?.error
            }
        default:
            return state
    }
}

export default postReducer