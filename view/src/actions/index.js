import { Redirect } from 'react-router-dom';

import auth from '../apis/auth';
import users from '../apis/users';
import { SIGN_IN, SIGN_OUT } from './types';
import history from '../history';



export const signUp = (formValues, isMentor) => async dispatch => {
    const newUser = await auth.post('/signup', {...formValues, isMentor});
    dispatch(signIn(newUser.data));
};
export const signIn = (formValues) => async dispatch => {
    const response = await auth.post('/signin', formValues);  
    dispatch({type:SIGN_IN, payload:response.data});    
    const {user} = response.data; 
    if(user) history.push(`${user.username}/profile`);
};

export const signOut = () => async dispatch => {
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
