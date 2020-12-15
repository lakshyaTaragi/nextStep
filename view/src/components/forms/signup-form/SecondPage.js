import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import validate from './validate';
import { renderField } from '../renderField';
import { signUp } from '../../../actions';



const SecondPage = (props) => {
    
    const { handleSubmit, pristine, previousPage, submitting, signUp, isMentor } = props;
    const onSubmit = (formValues) => {
        signUp(formValues, isMentor);
    };
    
        return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Field 
                name="firstName"
                type="text"
                component={renderField}
                label="First Name"
            />
            {/* <Field 
                name="lastName"
                type="text"
                component={renderField}
                label="Last Name"
            />
            <Field 
                name="city"
                type="text"
                component={renderField}
                label="City"
            />
            <Field 
                name="school"
                type="text"
                component={renderField}
                label="School"
            />
            <Field 
                name="schoolCity"
                type="text"
                component={renderField}
                label="School-city"
            />
            <Field 
                name="coaching"
                type="text"
                component={renderField}
                label="Coaching"
            />
            <Field 
                name="coachingCity"
                type="text"
                component={renderField}
                label="Coaching-city"
            />
            {isMentor && <Field 
                name="college"
                type="text"
                component={renderField}
                label="College"
            />} */}
            
          <div>
            <button type="button" className="previous" onClick={previousPage}>
                Previous
            </button>
            <button type="submit" disabled={pristine || submitting}>
                Submit
            </button>
          </div>
        </form>
      );
};
    
const formWrapped = reduxForm({
    form: 'signup', 
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, 
    validate
})(SecondPage);

export default connect(null,{
    signUp
})(formWrapped);
