
const initialState = {
    token: null,

}

const saveAccountReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'user/save-account': {
            return {
                token: action.payload
            }
        }
        default: return state;
    }
}

export default saveAccountReducer;