

const initialState = {
    product: null
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'search': {
            return {
                product: action.payload
            }
        }


        default: return state;
    }
}

export default searchReducer;