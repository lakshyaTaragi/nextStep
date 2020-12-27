import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import { renderField } from './renderField';
import { signIn } from '../../actions';

const SignIn = (props) => {

    let history = useHistory();

    const { handleSubmit, pristine, reset, submitting, signIn } = props;

    useEffect(()=>{reset()},[]);

    const onSubmit = formValues => {
        signIn(formValues)
        .then(()=>history.push(`/${formValues.username}/profile`));
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>{props.message}</div>
            <Field
                name="username"
                type="text"
                component={renderField}
                label="Username"
            />
            <Field
                name="password"
                type="password"
                component={renderField}
                label="Password"
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