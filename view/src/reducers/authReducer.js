import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE= {};
const prevUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')):null;
INITIAL_STATE.isSignedIn = prevUser ? true:false;
INITIAL_STATE.currentUser = prevUser;
INITIAL_STATE.message = prevUser.message;
    // isSignedIn: null,
    // currentUser: null,
    // message:null


export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SIGN_IN:
            const {user,info} = action.payload;
            localStorage.setItem('currentUser',JSON.stringify(action.payload));  
            return {...state, isSignedIn: user?true:state.isSignedIn, currentUser:user?user:state.currentUser, message:info.message};

        case SIGN_OUT:
            return {...state, isSignedIn:false, currentUser: null, message:'Logged out from '/*+user?user.username:''*/};

        default:
            return state;
    }
};

