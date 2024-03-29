import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { validate} from './validate';
import { asyncValidate } from './asyncValidate';
import {renderField} from '../renderField';

const FirstPage = (props) => {
    
    const {handleSubmit} = props;
    // already present in props by redux-form

    return (
        <form onSubmit={handleSubmit}>

            <Field
                name="username"
                type="text"
                component={renderField}
                placeholder="Unique Username"
            />

            <Field 
                name="email"
                type="email"
                component={renderField}
                placeholder="Email-id"
            />

            <Field 
                name="password"
                type="password"
                component={renderField}
                placeholder="Password"
            />

            <Field 
                name="password2"
                type="password"
                component={renderField}
                placeholder="Confirm Password"
            />

            <div>
                <button className="ui primary button" tabindex="0" type="submit">
                    Next
                </button>
            </div> 
                       
        </form>
    );
};



export default reduxForm({
    form: 'signup',
    destroyOnUnmount: false ,    //* to preserve data 
    forceUnregisterOnUnmount: true,     //* unregister fields on unmount
    validate,
    asyncValidate,
    asyncChangeFields: ['username', 'email']
})(FirstPage);

