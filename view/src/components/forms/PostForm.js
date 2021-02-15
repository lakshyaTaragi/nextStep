import React, { useEffect } from 'react'; 
import { Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { renderField } from './renderField';

// ! based on formAction prop --> create for now
import {createPost, updatePost, loadPostValues} from '../../actions';

const Post = (props) => {
    let history = useHistory();

    console.log(props);
    const { currentUser,
        createPost, updatePost, loadPostValues, 
        handleSubmit, submitting, pristine
    } = props;
    const {formAction} = props.location;

    
    useEffect(()=>{
        if(formAction==="update") loadPostValues(props.location.postValues);
        else loadPostValues({title:'', content:''});
    },[]);
    
    const onSubmit = formValues => {
        if(formAction==="create"){
            createPost(formValues, currentUser._id, currentUser.username)
            .then(()=>history.push(`/profile/${currentUser.username}`));
        } else if(formAction==="update"){
            updatePost(formValues, props.location.postValues._id, currentUser.username)
            .then(()=>history.push(`/profile/${currentUser.username}`));
        } 
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
           <Field
                name="title"
                type="text"
                component={renderField}
                label="Title"
            />
            <Field
                name="content"
                type="text"
                component={renderField}
                label="Content"
            />
            <div>
                <button type="submit" disabled={pristine||submitting}>
                    Submit
                </button>
            </div>
        </form>
    );
};

const validate = formValues => {
    const errors = {};
    if(!formValues.title) errors.title = 'Title cannot be blank';
    if(!formValues.content) errors.content = 'Content cannot be blank';
    return errors;
};


const formWrapped = reduxForm({
    form: 'post',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    enableReinitialize : true,
    validate
})(Post);

const mapStateToProps = (state) => {
    return {
        currentUser:state.auth.currentUser,
        initialValues: state.post.postValues
    };
};

export default connect(mapStateToProps, {
    createPost,
    updatePost,
    loadPostValues
})(formWrapped);