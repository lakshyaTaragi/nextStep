import _ from 'lodash';
import { SIGN_IN, SIGN_OUT, SAVE_SOCKET, NEW_CHATROOM } from '../actions/types';

const INITIAL_STATE = {};

const prevUser = JSON.parse(localStorage.getItem('currentUser'));
if(prevUser){
    INITIAL_STATE.isSignedIn = true;
    INITIAL_STATE.currentUser = prevUser.user;
    INITIAL_STATE.message = prevUser.info.message;
    INITIAL_STATE.socket = prevUser.socket;    
}


const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SIGN_IN:
            const {user,info} = action.payload;
            return {
                ...state,
                isSignedIn: user?true:state.isSignedIn,
                currentUser:user?user:state.currentUser,
                message:info.message
            };
        
        case SAVE_SOCKET:
            return {...state, socket:action.payload}; 

        case SIGN_OUT:
            return {
                ...state,
                isSignedIn:false,
                message:'Logged out from '+state.currentUser.username,
                currentUser: null,
                socket: null
            };

        case NEW_CHATROOM:
            console.log('auth');
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    chatRooms: [action.payload,...state.currentUser.chatRooms]
                }                
            };           

        default:
            return state;
    }
};

export default authReducer;