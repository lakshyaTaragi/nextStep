import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'

import {renderField} from '../renderField';


const SecondPage = (props) => {
    const { handleSubmit, pristine, previousPage, submitting } = props;
        return (
        <form onSubmit={handleSubmit}>
            <Field 
                name="firstName"
                type="text"
                component={renderField}
                label="First Name"
            />
            <Field 
                name="LastName"
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
                name="schoolName"
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
                name="coachingName"
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
            {props.isMentor && <Field 
                name="college"
                type="text"
                component={renderField}
                label="College"
            />}
            
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
    
export default reduxForm({
    form: 'signup', 
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, 
    validate
  })(SecondPage)