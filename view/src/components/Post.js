import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchPostById, deletePost, fetchComments } from '../actions';

import CommentForm from './forms/CommentForm';

const Post = (props) => {

    const [post, setPost] = useState({});
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);

    const { currentUser, fetchPostById, deletePost, postId, fetchComments, posts, setPosts } = props;

    useEffect(() => fetchPostById(postId).then(response => setPost(response[0])), []);

    const renderCommentsList = commentsList => commentsList.map(comment => (
        <div key={comment._id}>
            {comment.personsName} says {comment.content}
        </div>
    ))

    

    if(!_.isEmpty(post)){
        return (
            <div className="card ui raised segment" style={{width: "18rem"}} key={post._id}>
                <div className="card-body">


                    {/* Post's content */}
                    <div className="post content">
                        <h5 className="card-title">{post.title}</h5>                   
                        <p className="card-text">{post.content}</p>
                    </div>
        
                    
                    {/* Update/Delete options to authorized user */}
                    {!_.isEmpty(currentUser) && post.postedBy === currentUser._id ? 
                        
                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <Link className="btn btn-warning" to={{
                        pathname: `/${currentUser.username}/updatepost`,
                        formAction:"update",
                        postValues: post
                        }} >
                            Update post
                        </Link>

                        <button 
                            className="btn btn-danger" 
                            onClick={() => {
                                deletePost(post._id);
                                setPosts(_.remove(posts, (thisPost) => thisPost._id !== post._id )); 
                        }}>
                            Delete post
                        </button>

                    </div>
                    : null}


                    {/* Show/Hide comments button */}
                    <button className="btn btn-warning" onClick={async () => {
                        setShowComments(!showComments);
                        if(_.isEmpty(comments)){
                            fetchComments(post.comments)
                            .then(res => {
                                console.log(res);
                                setComments(res);
                            });  
                        } 
                    }}>
                        {!showComments ? 'View comments': 'Hide comments'}
                    </button>

                    {/* Comments List */}
                    {showComments ? renderCommentsList(comments): null}

                    {/* Add comment form */}
                    <CommentForm 
                        form={`commentBox_${postId}`} 
                        postId={post._id} 
                        setPost={setPost} 
                        setComments={setComments} 
                        comments_ids={post.comments}
                        setShowComments={setShowComments}
                    />

                </div>
            </div>
        );
    } else {
        return (
            // Content loading animation
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
