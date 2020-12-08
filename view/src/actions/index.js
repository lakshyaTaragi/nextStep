import auth from '../apis/auth';
import {SIGN_UP} from './types';

export const signUp = (formValues, isMentor) => async dispatch => {
    const response = await auth.post('/signup', {...formValues, isMentor});
    console.log(response);
};
