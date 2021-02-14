import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import history from '../history';

import { fetchPostById, deletePost, fetchComments } from '../actions';
import mentor from './screens/mentor.png'; 
import mentee from './screens/mentee.png'; 

import CommentForm from './forms/CommentForm';

const Post = (props) => {

    const [post, setPost] = useState({});
    const [personInfo, setPersonInfo] = useState({});
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);

    const { currentUser, fetchPostById, deletePost, postId, fetchComments} = props;

    useEffect(() => {
        fetchPostById(postId).then(response => {
            const {name, username, isMentor} = response;
            setPersonInfo({name, username, isMentor})
            setPost(response._doc);
        });
    }, []);

    const renderCommentsList = commentsList => commentsList.map(comment => (
        <div key={comment._id}>
            {comment.personsName} says {comment.content}
        </div>
    ));

    const userTag = (name, username, userId, isMentor) => (
        <div className="ui feed">
            <div className="event">
                <div className="label">
                    <img src={isMentor ? mentor:mentee}/>
                </div>
                <div className="content">
                    <div className="summary">
                        <Link 
                            className="user"
                            to={{
                                pathname: `/profile/${username}`,
                                state: {
                                    userId: userId
                                }
                            }}
                        >
                            {name}
                            <br/>
                            <div className="meta">
                            @{username}
                            </div>
                        </Link> 
                        
                        {/* added you as a friend
                        <div className="date">
                        1 Hour Ago
                        </div> */}
                    </div>
                    {/* <div className="meta">
                        <a className="like">
                        <i className="like icon"></i> 4 Likes
                        </a>
                    </div> */}
                </div>
            </div>  
        </div>
    );

    const postLoading = () => (
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

    const showCommentsToggle = async () => {
        setShowComments(!showComments);
        if(_.isEmpty(comments)) {
            fetchComments(post.comments)
            .then(res => setComments(res));  
        }
    }
    
    // const authorizedOptions = () => {    //!--> AFTER DELETION BUG SOLVING

    // };

    if(!_.isEmpty(post)){
        return (
            <div className="card ui raised segment" style={{width: "18rem"}} key={postId}>
                <div className="card-body">

                    {userTag(personInfo.name, personInfo.username, post.postedBy, personInfo.isMentor)}

                    {/* Post's content */}
                    <div className="post content">
                        <h5 className="card-title">{post.title}</h5>                   
                        <p className="card-text">{post.content}</p>
                    </div>
        
                    
                    {/* Update/Delete options to authorized user */}
                    {!_.isEmpty(currentUser) && post.postedBy === currentUser._id ? 
                        
                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                            
                            <Link 
                            className="btn btn-warning" 
                            to={{
                                pathname: `/${currentUser.username}/updatepost`,
                                formAction:"update",
                                postValues: post
                            }}>
                                Update post
                            </Link>

                            <button 
                                className="btn btn-danger" 
                                onClick={() => {
                                    deletePost(postId);
                                    history.go(0);
                            }}>
                                Delete post
                            </button>

                    </div>
                    : null}


                    {/* Show/Hide comments button */}
                    <button className="btn btn-warning" onClick={showCommentsToggle}>
                        {!showComments ? 'View comments': 'Hide comments'}
                    </button>

                    {/* Comments List */}
                    {showComments ? renderCommentsList(comments): null}

                    {/* Add comment form */}
                    <CommentForm 
                        form={`commentBox_${postId}`}   //! necessary, else all comment boxes get filled with same value
                        postId={postId} 
                        setPost={setPost} 
                        setComments={setComments} 
                        comments_ids={post.comments}
                        setShowComments={setShowComments}
                    />

                </div>
            </div>
        );
    } else {
        return postLoading();
    }    
};

const mapStateToProps = state => ({currentUser:state.auth.currentUser});

export default connect(mapStateToProps, {
    fetchPostById,
    deletePost,
    fetchComments
})(Post);
