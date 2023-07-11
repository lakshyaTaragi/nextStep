import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { textInput } from '../forms/renderField';
import { createComment, fetchPost, fetchComments } from '../../actions'; 

const CommentForm = (props) => {

    const { handleSubmit, pristine, reset, submitting,          //redux-form
        postId, setPost, setComments, setShowComments,          //parent
        createComment,                                          //a.c.
        currentUser } = props;                                  //state 


    const onSubmit = formValues => {
        createComment(currentUser._id, currentUser.username, formValues, postId)
        .then( updatedPost => {
            //Update post and comments on Post component
            setPost(updatedPost);       // needed later to show the no of comments beside icon
            setComments(updatedPost.comments);
            setShowComments(true);
        });        
        reset();    //Wipe the comment input 
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
    fetchPost,
    fetchComments
})(formWrapped);