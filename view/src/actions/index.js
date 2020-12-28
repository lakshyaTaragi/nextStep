import _ from 'lodash';
import moment from 'moment';

import auth from '../apis/auth';
import users from '../apis/users';
import posts from '../apis/posts';

import { SIGN_IN, SIGN_OUT, LOAD_POST_VALUES, SAVE_SOCKET} from './types';


export const signUp = (formValues, isMentor) => async () => {
    await auth.post('/signup', {...formValues, isMentor});
};

export const signIn = (formValues) => async dispatch => {
    const response = await auth.post('/signin', formValues); 
    const saveUser = {...response.data, user:_.omit(response.data.user,'chats','myPosts','password')};
    localStorage.setItem('currentUser',JSON.stringify(saveUser)); 
    dispatch({type:SIGN_IN, payload:saveUser});  
};

export const signOut = (socket) => async dispatch => {
    socket.disconnect();
    localStorage.removeItem('currentUser');
    await auth.get('/signout');
    dispatch({type: SIGN_OUT});
};

export const saveSocket = socket => async dispatch => dispatch({type: SAVE_SOCKET, payload: socket});



// ! *****************************************************************************



// export const fetchByUsername = (username) => async dispatch => {
//     const foundUser = await users.get(`/${username}`);
//     return foundUser;
// };

// export const matchUsernameParam = async (currentUser, pathUsername) => {
//    if(currentUser.username === pathUsername) return true;
//    return false;
// };

//! *****************************************************************************
//! POSTS RELATED ACTIONS

// ! Create post
export const createPost = (formValues, userId) => async () => {
    await posts.post(
        '/createpost',
        {...formValues, userId}
    );    
} 

export const fetchMyPosts = (userId) => async () => {
    const response = await posts.get(`/myposts/${userId}`);
    return response.data;
};

// ! Load post values
export const loadPostValues = postValues => ({type: LOAD_POST_VALUES, payload: postValues});


// ! Update post
export const updatePost = (formValues, postId) => async () => {
    await posts.patch(
        '/updatepost',
        {...formValues, postId}
    );
} 


// ! Delete post
export const deletePost = (postId) => async () => {
    await posts.delete(`/deletepost/${postId}`);
} 



//! *****************************************************************************
//! CHAT RELATED ACTIONS

export const sendChat = (formValues, senderId, receiverId, socket) => async () => {
    //    both sides have to load their chat messages after this
    const time = moment().format('h:mm a');
    socket.emit('newMessage', formValues.message, senderId, receiverId, time);
};


export const loadChat = (senderId, receiverId) => async () => {
    const response = await users.get(`/chat/loadChat/${senderId}/${receiverId}`);
    return response.data[0].messages;
};

// export const ifChatted = (senderId, receiverId) => async dispatch => {
//     const response = await users.get(`/chat/${senderId}/${receiverId}`);
// };


