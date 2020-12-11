import auth from '../apis/auth';
import { SIGN_IN } from './types';
import history from '../history';


export const signUp = (formValues, isMentor) => async dispatch => {
    const newUser = await auth.post('/signup', {...formValues, isMentor});
    dispatch(signIn(newUser.data));
};
export const signIn = (formValues) => async dispatch => {
    const response = await auth.post('/signin', formValues);
    
    dispatch({type:SIGN_IN, payload:response.data});
    const {user} = response.data;
    if(user) history.push(user.username+'/profile/');
};
