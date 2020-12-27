import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {};

const prevUser = JSON.parse(localStorage.getItem('currentUser'));
if(prevUser){
    INITIAL_STATE.isSignedIn = true;
    INITIAL_STATE.currentUser = prevUser.user;
    INITIAL_STATE.message = prevUser.info.message;
    
}


const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SIGN_IN:
            const {user,info} = action.payload;
            return {...state, isSignedIn: user?true:state.isSignedIn, currentUser:user?user:state.currentUser, message:info.message};

        case SIGN_OUT:
            return {...state, isSignedIn:false, message:'Logged out from '+state.currentUser.username, currentUser: null};

        default:
            return state;
    }
};

export default authReducer;