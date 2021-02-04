import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';

import { fetchPostById, deletePost, createComment, fetchComments } from '../actions';
import CommentForm from './forms/CommentForm';

const Post = (props) => {

    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const { currentUser,  fetchPostById, deletePost, postId, fetchComments } = props;

    useEffect(() => fetchPostById(postId).then(response => setPost(response[0])), []);

    const renderCommentsList = commentsList => {
        return commentsList.map(comment => {
            return (
                <div key={comment._id}>
                    {comment.personsName} says {comment.content}
                </div>
            );
        })
    }

    if(!_.isEmpty(post)){
        console.log(post);
        return (
            <div className="card ui raised segment" style={{width: "18rem"}} key={post._id}>
                <div className="card-body">    
                    <div className="post content">

                        {/* //! onClick={()=>fetchPostById(post._id)}  */}

                        <h5 className="card-title">{post.title}</h5>                   
                        <p className="card-text">{post.content}</p>
                    </div>
        
                    {!_.isEmpty(currentUser) && post.postedBy === currentUser._id ? 
                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <Link className="btn btn-warning" to={{
                        pathname: `/${currentUser.username}/updatepost`,
                        formAction:"update",
                        postValues: post
                        }} >
                            Update post
                        </Link>
                        <button className="btn btn-danger" onClick={() => {
                            deletePost(post._id);

                            props.setPosts(_.remove(props.posts, (thisPost) => thisPost._id !== post._id )); 

                        }}> Delete post </button>
                    </div>
                    : null}

                    {!_.isEmpty(comments) ? renderCommentsList(comments): null}

                    <CommentForm postId={post._id} setPost={setPost} setComments={setComments} comments_ids={post.comments}/>
                    
                    <button className="btn btn-warning" onClick={async () => {
                        const commentsList = await fetchComments(post.comments);
                        setComments(commentsList);
                    }}>
                        {post.comments.length} comments... click to view
                    </button>

                                {/* //TODO: RENDER COMMENTS LIST AND ADD A COMMENT TEXT INPUT FORM SECTION */}
                </div>
            </div>
        );
    } else {
        return (
            <div className="card ui raised segment" style={{width: "18rem"}} >
                <div className="card-body ui placeholder">    
                    <div className="post content">
                        <h5 className="card-title"><div className="line"></div></h5>                   
                        <p className="card-text"><div className="line"></div></p>
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                    <div className="line"></div><div className="line"></div>
                    </div>            
                </div>
            </div>
        );
    }    
};

const mapStateToProps = state => ({currentUser:state.auth.currentUser});

export default connect(mapStateToProps,{
    fetchPostById,
    deletePost,
    fetchComments
})(Post);
