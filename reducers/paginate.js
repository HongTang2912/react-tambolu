

const initialState = {
    nodes: []
}

const paginateReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'paginate/goto': {
            return action.payload
        }
        case 'paginate/goto-search': {
            return {
                ...state,
                search: action.payload
            }
        }   
        
        default: return state;
    }
}

export default paginateReducer;