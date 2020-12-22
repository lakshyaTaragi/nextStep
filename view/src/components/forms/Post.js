import React from 'react';
import PropTypes from 'prop-types'; 
import { Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';

import { renderField } from './renderField';

// ! based on formAction prop --> create for now
import {createPost, updatePost, deletePost} from '../../actions';

const Post = (props) => {
    const { currentUser,
        createPost, updatePost, deletePost, 
        handleSubmit, pristine, submitting
    } = props;

    const onSubmit = formValues => createPost(formValues,currentUser._id);

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
                <button type="submit" disabled={pristine || submitting}>
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

Post.propTypes = {
    formAction: PropTypes.string.isRequired
};

const formWrapped = reduxForm({
    form: 'post',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(Post);

const mapStateToProps = (state) => {
    return {currentUser:state.auth.currentUser};
};

export default connect(mapStateToProps, {
    createPost,
    updatePost,
    deletePost
})(formWrapped);