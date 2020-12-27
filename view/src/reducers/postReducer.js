import { LOAD_POST_VALUES } from '../actions/types';

const postReducer = (state = {}, action) => {
    switch(action.type){
        case LOAD_POST_VALUES:
            return {postValues: action.payload};
        default:
            return state;
    }
};

export default postReducer;