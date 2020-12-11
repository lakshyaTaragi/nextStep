import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE= {
    isSignedIn: null,
    userId: null,
    message:null
};

export default (state=INITIAL_STATE, action) => {
    switch(action.type){

        case SIGN_IN:
            const {user, info} = action.payload;
            return {...state, isSignedIn: user?true:state.isSignedIn, userId: user?user._id:state.userId, message:info.message};
        
        case SIGN_OUT:
            return {...state, isSignedIn:false, userId: null};

        default:
            return state;
    }
};