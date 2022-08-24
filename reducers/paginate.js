

const initialState = {
    prod_length: null,
    nodes: []
}

const paginateReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'paginate/goto': {
            return action.payload
        }


        default: return state;
    }
}

export default paginateReducer;