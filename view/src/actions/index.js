import { Redirect } from 'react-router-dom';

import auth from '../apis/auth';
import users from '../apis/users';
import { SIGN_IN, SIGN_OUT, CREATE_POST, UPDATE_POST, DELETE_POST } from './types';
import history from '../history';



export const signUp = (formValues, isMentor) => async dispatch => {
    const newUser = await auth.post('/signup', {...formValues, isMentor});
    //! show a login button and the use signIn in it --> later
    dispatch(signIn(newUser.data));
};
export const signIn = (formValues) => async dispatch => {
    
    const response = await auth.post('/signin', formValues); 
    localStorage.setItem('currentUser',JSON.stringify(response.data)); 
    dispatch({type:SIGN_IN, payload:response.data});    
    const {user} = response.data; 
    if(user) history.push(`${user.username}/profile`);
};

export const signOut = () => async dispatch => {
    localStorage.removeItem('currentUser'); 
    const response = await auth.get('/signout');
    dispatch({type: SIGN_OUT});
    
    // ! remove from localStorage

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


// ! Create post
export const createPost = formValues => async () => {

     console.log('new post created');
} 

// ! update post
export const updatePost = formValues => async () => {

    console.log(' post updated');
} 


// ! delete post
export const deletePost = formValues => async () => {

    console.log('post deleted');
} 
