import React from 'react';
import {Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';

import { renderField } from './renderField';
import { signIn } from '../../actions';

const SignIn = (props) => {
    const { handleSubmit, pristine, submitting, signIn } = props;

    const onSubmit = formValues => signIn(formValues);

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>{props.message}</div>
            <Field
                name="username"
                type="text"
                component={renderField}
                Label="Username"
            />
            <Field
                name="password"
                type="password"
                component={renderField}
                Label="Password"
            />
            <div>
                <button type="submit" disabled={pristine || submitting}>
                    Submit
                </button>
            </div>
        </form>
    );

}; 

const validate = formValues => {
    const errors = {};

    if(!formValues.username){errors.username = 'Required'}
    if(!formValues.password){errors.password = 'Required'}

    return errors;
};

const formWrapped = reduxForm({
    form: 'signin',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(SignIn);

const mapStateToProps = (state) => {
    return {message: state.auth.message};
}

export default connect(mapStateToProps, {
    signIn
})(formWrapped);