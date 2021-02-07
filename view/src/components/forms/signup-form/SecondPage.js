import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";


import validate from './validate';
import { renderField } from '../renderField';
import { signUp, signIn, renderImageFromDB } from '../../../actions';
import image from '../../../apis/image';



const SecondPage = (props) => {

    let history = useHistory();
    const [registeredUser, setRegisteredUser] = useState({});
    const [dp, setDp] = useState(null);
    const [uploadDone, setUploadDone] = useState(false);
    const [imData, setImData]=useState(false);
    const { handleSubmit, pristine, previousPage, submitting, signUp, signIn, isMentor, currentUser, renderImageFromDB } = props;
    
    const onSubmit = (formValues) => {
        signUp(formValues, isMentor);
        setRegisteredUser(formValues);
    };

    const onFileChoice = e => {
        console.log(e.target.files[0])
        setDp(e.target.files[0]);
    }

    const onImageUpload = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', dp);
        formData.append('username', registeredUser.username);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        image.post('/create', formData, config)
        .then(res => {
            if(res.data) {
                setUploadDone(true);
                console.log(res.data); 
                setImData(res.data);
            }
        });
    }

       
        return (
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Field 
                        name="firstName"
                        type="text"
                        component={renderField}
                        label="First Name"
                    />
                    <Field 
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

                {registeredUser.username && 
                    <div>
                        <div className="btn btn-primary" 
                            onClick={() => {
                                signIn(registeredUser).then(()=>history.push(`/${registeredUser.username}/profile`));
                        }}>
                            Login as {registeredUser.username}
                        </div>
                        <br/>
                        <br/>
                        <form onSubmit={ onImageUpload } >
                            <input name="myImage" onChange={onFileChoice} type="file" accept=".jpg, .png, .jpeg" change="fileEvent($event)" className="inputfile" />
                            <button type="submit" className={`ui ${dp ? '':'disabled'} button`} >
                                <i className="user icon"></i>
                                {uploadDone ? 'Change profile picture':'Set profile picture'}
                            </button>
                        </form>
                        <br/>
                        {uploadDone && 
                            <div>
                                Uploaded Successfully
                                {imData?renderImageFromDB(imData, "rounded"):null}
                            </div>
                        }
                    </div>
                }

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
    signIn,
    renderImageFromDB
})(formWrapped);
