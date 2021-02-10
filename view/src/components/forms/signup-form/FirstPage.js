import React from 'react';
import { Field, reduxForm} from 'redux-form';

import { validate} from './validate';
import { asyncValidate } from './asyncValidate';
import {renderField} from '../renderField';

const FirstPage = (props) => {
    
    const {handleSubmit} = props;
    // already present in props by redux-form

    return (
        <form className="ui form" onSubmit={handleSubmit}>
            <Field
                className="field" 
                name="username"
                type="text"
                component={renderField}
                label="Unique Username"
            />
            <Field
                className="field"  
                name="email"
                type="email"
                component={renderField}
                label="Email-id"
            />
            <Field
                className="field"  
                name="password"
                type="password"
                component={renderField}
                label="Password"
            />
            <Field
                className="field"  
                name="password2"
                type="password"
                component={renderField}
                label="Confirm Password"
            />
            <div>
                <button className="positive ui button" type="submit" className="next">
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
    asyncChangeFields: ['username']
})(FirstPage);

