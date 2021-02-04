import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { textInput } from '../forms/renderField';
import { createComment, fetchPostById, fetchComments } from '../../actions'; 

const CommentForm = (props) => {

    const { handleSubmit, pristine, reset, submitting, currentUser, postId, createComment, fetchPostById, setPost, setComments, fetchComments } = props; 


    const onSubmit = formValues => {
        console.log(currentUser._id, currentUser.username, formValues, postId);
        createComment(currentUser._id, currentUser.username, formValues, postId);
        fetchPostById(postId).then(res => {
            setPost(res[0]);
            reset();
        });
        fetchComments(props.comments_ids).then(res => setComments(res[0]));
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <Field
                name="comment"
                type="text"
                component={textInput}
                placeholder="Add a comment..."
            />
            <div>
                <button className="btn btn-primary" type="submit" disabled={pristine || submitting}>
                    Post
                </button>
            </div>
        </form>
    );

}; 


const formWrapped = reduxForm({
    form: 'comment'
})(CommentForm);

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
    };
}

export default connect(mapStateToProps, {
    createComment,
    fetchPostById,
    fetchComments
})(formWrapped);