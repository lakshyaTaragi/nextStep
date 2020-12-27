import auth from '../apis/auth';
import users from '../apis/users';
import posts from '../apis/posts';

import { SIGN_IN, SIGN_OUT, LOAD_POST_VALUES} from './types';


export const signUp = (formValues, isMentor) => async () => {
    await auth.post('/signup', {...formValues, isMentor});
};

export const signIn = (formValues) => async dispatch => {
    const response = await auth.post('/signin', formValues); 
    localStorage.setItem('currentUser',JSON.stringify(response.data)); 
    dispatch({type:SIGN_IN, payload:response.data});    
};

export const signOut = () => async dispatch => {
    localStorage.removeItem('currentUser');
    await auth.get('/signout');
    dispatch({type: SIGN_OUT});
};


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



