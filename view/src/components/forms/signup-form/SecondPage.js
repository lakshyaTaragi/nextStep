import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";


import validate from './validate';
import { renderField } from '../renderField';
import { signUp, signIn } from '../../../actions';



const SecondPage = (props) => {

    let history = useHistory();
    const [registeredUser, setRegisteredUser] = useState({});
    
    const { handleSubmit, pristine, previousPage, submitting, signUp, signIn, isMentor, currentUser } = props;
    const onSubmit = (formValues) => {
        signUp(formValues, isMentor);
        setRegisteredUser(formValues);
    };

       
        return (
            <div>
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

                {registeredUser.username && <div className="btn btn-primary" onClick={()=>{
                    signIn(registeredUser).then(()=>history.push(`/${registeredUser.username}/profile`));
                }}>Login as {registeredUser.username}</div>}

            </div>
        );
};

const formWrapped = reduxForm({
    form: 'signup', 
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, 
    validate
})(SecondPage);

export default connect(null,{
    signUp,
    signIn
})(formWrapped);
