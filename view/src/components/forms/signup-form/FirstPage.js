import React from 'react';
import { Field, reduxForm} from 'redux-form';

import validate from './validate';
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
                label="Unique Username"
            />
            <Field 
                name="email"
                type="email"
                component={renderField}
                label="Email-id"
            />
            <Field 
                name="password"
                type="password"
                component={renderField}
                label="Password"
            />
            <Field 
                name="password2"
                type="password"
                component={renderField}
                label="Confirm Password"
            />
            <div>
                <button type="submit" className="next">
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
    validate
})(FirstPage);

