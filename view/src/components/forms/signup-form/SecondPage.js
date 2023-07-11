import React, { useState } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import { validate } from './validate';
import { renderField } from '../renderField';
import DropdownInput from '../../DropdownInput';
import { signUp, signIn, renderImageFromDB } from '../../../actions';
import image from '../../../apis/image';
import users from '../../../apis/users';

const SecondPage = (props) => {

    let history = useHistory();
    const [registeredUser, setRegisteredUser] = useState({});
    const [coaching, setCoaching] = useState(false);    
    const [dp, setDp] = useState(null);    
    const [uploadDone, setUploadDone] = useState(false);
    const [imData, setImData] = useState(false);
    
    const { handleSubmit, pristine, previousPage, submitting,               //redux form props
        signUp, signIn, renderImageFromDB,                                  //a.c.
        isMentor,                                                           //from previous page
        schoolCity, coachingCity} = props;                                  //form values
    
    const onSubmit = (formValues) => {
        signUp(formValues, isMentor)
        .then(_id => setRegisteredUser({...formValues, _id}));        
    };

    const onFileChoice = e => {
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
                // console.log(res.data); 
                setImData(res.data);
                setDp(null);
            }
        });
    }

    const onEntry = async (city, type, currentValue) => {
        const response = await users.get(`suggested/${city}/${type}/${currentValue}`);
        console.log(response.data);
        return response.data;
    };

    const toTitleCase = (value) => {
        if(!value) return value;
        return value.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()      
        );
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="field">
                    <label>Name</label>
                    <div className="two fields">

                        <Field 
                            name="firstName"
                            type="text"
                            component={renderField}
                            placeholder="First Name"
                            normalize = {toTitleCase}
                        />

                        <Field 
                            name="lastName"
                            type="text"
                            component={renderField}
                            placeholder="Last Name"
                            normalize = {toTitleCase}
                        />
                    
                    </div>
                </div>

                <Field 
                    name="hometown"
                    type="text"
                    component={renderField}
                    placeholder="Hometown"
                    normalize = {toTitleCase}
                />

                <div className="field">
                    <div className="two fields">

                        <Field 
                            name="schoolCity"
                            type="text"
                            component={renderField}
                            placeholder="School-city"
                            normalize = {toTitleCase}
                        />

                        <Field 
                            name="school"
                            type="text"
                            // component={DropdownInput} //! different component
                            component={renderField}
                            placeholder="School"
                            // normalize = {toTitleCase}  //!
                            // onChange = {(event) => {
                            //     console.log(event)
                            //     if(event){
                            //         onEntry(schoolCity, 'schools', event);
                            //     }                                    
                            // }}
                        />
                    
                    </div>
                </div>


                <div className="inline field">
                    <div className="ui checkbox">
                        <input type="checkbox" tabindex="0" onClick={() => setCoaching(!coaching)} />
                        <label>Coaching</label>
                    </div>
                </div>

                {coaching && 
                    <div className="field">
                        <div className="two fields">

                            <Field 
                                name="coachingCity"
                                type="text"
                                component={renderField}
                                placeholder="Coaching-city"
                                normalize = {toTitleCase}
                            />
                            
                            <Field 
                                name="coaching"
                                type="text"
                                // component={DropdownInput}
                                component={renderField}
                                placeholder="Coaching" //! different component
                                // normalize = {toTitleCase}
                                // onChange = {(event) => {
                                //     console.log(event)
                                //     if(event){
                                //         onEntry(coachingCity, 'coachings', event);
                                //     }                                    
                                // }}
                            />                       
                        </div>
                    </div>
                }                    
                
                {isMentor && 
                    <Field 
                        name="college"
                        type="text"
                        // component={DropdownInput}
                        component={renderField}
                        placeholder="College"
                        // normalize = {(value) => value.replace(
                        //     /\w\S*/g,
                        //     function(txt) {
                        //         let result = txt.charAt(0).toUpperCase() + txt.substr(1);
                        //         result =  result.replace("Of", "of");
                        //         return result;
                        //     }
                        // )}
                        // onChange = {(event) => {
                        //     console.log(event)
                        //     // if(event!==''){
                        //     //     onEntry(undefined, 'colleges', event.target.value);
                        //     // }                                    
                        // }}
                    />
                }
                

            <div>

                <button className="ui labeled icon button" onClick={previousPage}>
                    <i className="left arrow icon"></i>Previous
                </button>

                <button type="submit" className={`ui right labeled ${pristine || submitting ? 'disabled':''} icon button`} >
                    Submit <i className="user icon"></i>
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
                            Login as {`${registeredUser.firstName} ${registeredUser.lastName} (${registeredUser.username})`} <i className="sign in alternate icon"></i>
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
        
        </>

        
    );
};

const formWrapped = reduxForm({
    form: 'signup', 
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, 
    validate
})(SecondPage);

const selector = formValueSelector('signup');

const mapStateToProps = (state) => ({
    schoolCity: selector(state, 'schoolCity'),
    coachingCity: selector(state, 'coachingCity'), 
});

export default connect(mapStateToProps,{
    signUp,
    signIn,
    renderImageFromDB
})(formWrapped);
