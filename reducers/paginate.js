

const initialState = {
    page: 0,
    

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