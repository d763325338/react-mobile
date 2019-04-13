var initialState = [];
function Grid(state=initialState,action){
    switch(action.type){
        case 'GETGRID':
        return [...action.payload];
        default:
        return state;
    }
}

export default Grid;