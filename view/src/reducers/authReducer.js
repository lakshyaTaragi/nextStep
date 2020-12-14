import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {};

const prevUser = JSON.parse(localStorage.getItem('currentUser'));
if(prevUser){
    INITIAL_STATE.isSignedIn = true;
    INITIAL_STATE.currentUser = prevUser.user;
    INITIAL_STATE.message = prevUser.info.message;
    
}


export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SIGN_IN:
            const {user,info} = action.payload;
            // localStorage.setItem('currentUser',JSON.stringify(action.payload));  
            return {...state, isSignedIn: user?true:state.isSignedIn, currentUser:user?user:state.currentUser, message:info.message};

        case SIGN_OUT:
            return {...state, isSignedIn:false, currentUser: null, message:'Logged out from '/*+user?user.username:''*/};

        default:
            return state;
    }
};
