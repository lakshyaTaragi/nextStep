import auth from '../apis/auth';
import {SIGN_UP, SIGN_IN} from './types';

export const signUp = (formValues, isMentor) => async dispatch => {
    const response = await auth.post('/signup', {...formValues, isMentor});
    // ! decide payloads of both actions
    dispatch({type:SIGN_UP, payload:response.data});
};

export const signIn = (formValues) => async dispatch => {
    const response = await auth.post('/signin', formValues);
    dispatch({type:SIGN_IN, payload:''});
};
