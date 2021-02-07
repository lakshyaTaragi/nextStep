import _ from 'lodash';
import moment from 'moment';

import auth from '../apis/auth';
import users from '../apis/users';
import posts from '../apis/posts';
// import image from '../apis/image';

import { SIGN_IN, SIGN_OUT, LOAD_POST_VALUES, SAVE_SOCKET} from './types';
import image from '../apis/image';


export const signUp = (formValues, isMentor) => async () => {
    await auth.post('/signup', {...formValues, isMentor});
};

// export const fileUpload = (file) => async () => {
//     const profilePicData = new FormData();
//     const response = await image.post('/create', file);
//     return response.data();
// }

export const signIn = (formValues) => async dispatch => {
    const response = await auth.post('/signin', formValues); 
    const saveUser = {...response.data, user:_.omit(response.data.user,'chats','myPosts','password')};
    localStorage.setItem('currentUser',JSON.stringify(saveUser)); 
    dispatch({type:SIGN_IN, payload:saveUser});  
};

export const signOut = (socket) => async dispatch => {
    if(socket) socket.disconnect();
    localStorage.removeItem('currentUser');
    await auth.get('/signout');
    dispatch({type: SIGN_OUT});
};

export const saveSocket = socket => async dispatch => dispatch({type: SAVE_SOCKET, payload: socket});



// ! *****************************************************************************

export const populateInfo = (username) => async () => {
    const response = await users.get(`/populate/${username}`);
    console.log(response.data);
    return response.data;
}

export const getImage = id => async () => {
    const response = await image.get(`/show/${id}`);
    return response.data;
}

export const renderImageFromDB = (rec_image,classes) => {
    const dp = rec_image.img.data.data;
    let TYPED_ARRAY = new Uint8Array(dp);
    const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
    let base64String = btoa(STRING_CHAR);
    return <img className={`ui small ${classes} image`} src={`data:image/png;base64,${base64String}`}/>
}

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

export const fetchPostById = (postId) => async () => {
    const response = await posts.get(`fetchpost/${postId}`);
    console.log(response.data);
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
    const time = moment().format('h:mm a');
    socket.emit('newMessage', formValues.message, senderId, receiverId, time);
};


export const loadChat = (senderId, receiverId) => async () => {
    const response = await users.get(`/chat/loadChat/${senderId}/${receiverId}`);
    return response.data; 
};


//! *****************************************************************************
//! COMMENT RELATED ACTIONS
// ! Create comment
export const createComment = (userId, username, formValues, postId ) => async () => {
    console.log('createComment called');
    await posts.post(
        '/createComment',
        {userId, username, ...formValues, postId} 
    );    
}

// !fetch comments for a post
export const fetchComments = (comments_ids) => async () => {
    const response = await posts.post('/getComments', comments_ids);
    return response.data;
}

// // ! Update comment
// export const updatePost = (formValues, postId) => async () => {
//     await posts.patch(
//         '/updatepost',
//         {...formValues, postId}
//     );
// } 


// // ! Delete comment
// export const deletePost = (postId) => async () => {
//     await posts.delete(`/deletepost/${postId}`);
// } 


