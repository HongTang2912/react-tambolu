

const initialState = {
    user: null,

}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'user/login': {
            return {
                user: action.payload
            }
        }
        case 'user/logout': {
            return {
                user: null
            }
        }
        default: return state;
    }
}

export default loginReducer;