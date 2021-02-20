import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";


import { validate } from './validate';
import { renderField } from '../renderField';
import { signUp, signIn, renderImageFromDB } from '../../../actions';
import image from '../../../apis/image';



const SecondPage = (props) => {

    let history = useHistory();

    const [registeredUser, setRegisteredUser] = useState({});

    const [dp, setDp] = useState(null);
    
    const [uploadDone, setUploadDone] = useState(false);

    const [imData, setImData]=useState(false);
    
    const { handleSubmit, pristine, previousPage, submitting, signUp, signIn, isMentor, renderImageFromDB } = props;
    
    const onSubmit = (formValues) => {
        signUp(formValues, isMentor)
        .then(_id => setRegisteredUser({...formValues, _id}));        
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
                setDp(null);
            }
        });
    }

       
        return (
            <React.Fragment>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div class="field">
                        <label>Name</label>
                        <div class="two fields">

                            <Field 
                                name="firstName"
                                type="text"
                                component={renderField}
                                placeholder="First Name"
                            />

                            <Field 
                                name="lastName"
                                type="text"
                                component={renderField}
                                placeholder="Last Name"
                            />
                        
                        </div>
                    </div>


                    <Field 
                        name="hometown"
                        type="text"
                        component={renderField}
                        placeholder="Hometown"
                    />

                    <Field 
                        name="schoolCity"
                        type="text"
                        component={renderField}
                        placeholder="School-city"
                    />

                    <Field 
                        name="school"
                        type="text"
                        component={renderField}
                        placeholder="School"
                    />

                    <Field 
                        name="coaching"
                        type="text"
                        component={renderField}
                        placeholder="Coaching"
                    />
                    <Field 
                        name="coachingCity"
                        type="text"
                        component={renderField}
                        placeholder="Coaching-city"
                    />
                    
                    {isMentor && <Field 
                        name="college"
                        type="text"
                        component={renderField}
                        placeholder="College"
                    />}
                    

                <div>

                    <button className="ui labeled icon button" onClick={previousPage}>
                        <i class="left arrow icon"></i>Previous
                    </button>

                    <button type="submit" className="ui right labeled icon primary button" disabled={pristine || submitting}>
                        Submit <i class="user icon"></i>
                    </button>

                </div>   

            </form>             

                {registeredUser.username && 
                    <div>
                        <br/>
                        <div className="field">

                            <button className="ui right labeled icon primary button" 
                                onClick={() => {
                                    signIn(registeredUser)
                                    .then(() => {
                                        history.push(`/profile/${registeredUser.username}`);
                                    });
                            }}>
                                Login as {`${registeredUser.firstName} ${registeredUser.lastName} (${registeredUser.username})`} <i class="sign in alternate icon"></i>
                            </button>

                        </div>

                        <form onSubmit={ onImageUpload } >
                        
                            <h4 className="ui dividing header">{!uploadDone ? 'Choose':'Change'} Profile picture {!uploadDone ? '(optional)':''}</h4>
                            
                            <div className="field"> 
                                <input name="myImage" onChange={onFileChoice} type="file" accept=".jpg, .png, .jpeg" change="fileEvent($event)" className="inputfile" />
                            </div>

                            <div> 
                                <button type="submit" className={`ui ${dp ? '':'disabled'} button`} >
                                    <i className="user icon"></i>
                                    {uploadDone ? 'Change profile picture':'Set profile picture'}
                                </button>
                            </div>

                            {uploadDone && 
                                <div>
                                    Uploaded Successfully
                                    {imData?renderImageFromDB(imData, "small centered"):null}
                                </div>
                            }
                            
                        </form>



                        
                    </div>
                }
            
            </React.Fragment>

            
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
