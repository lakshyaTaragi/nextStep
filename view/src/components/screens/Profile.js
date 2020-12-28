import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import _ from 'lodash';

//! try to move to api folder later

import { signOut, fetchMyPosts, deletePost } from '../../actions';

import Post from '../Post';





const Profile = (props) => {
    
    
    const [onlineUsers, setOnlineUsers] = useState([]); 

    const [posts, setPosts] = useState([]); 
    
    const { currentUser, socket, fetchMyPosts, signOut, deletePost, message } = props;
    
    
    useEffect(()=>{
        
        


        // fetch personal posts
        fetchMyPosts(currentUser._id)
        .then(response => setPosts(response));
        
        // ! hardcoded for now
        setOnlineUsers([{
            username:"a",
            id:"5fe8b33e9a3273348c8ba6bc"
        },
        {
            username:"b",
            id:"5fe8b3519a3273348c8ba6c0"
        },
        {
            username:"c",
            id:"5fe8b35b9a3273348c8ba6c4"
        },
        {
            username:"d",
            id:"5fe8b3629a3273348c8ba6c8"
        }]);

    },[]);
    
    



    const createOnlineUsersList = (onlineUsers) => {
        return onlineUsers.map(onlineUser => {
            if(onlineUser.id!==currentUser._id){
                return (
                    <div>
                        <Link className="btn btn-success" key={onlineUser.id} to={{
                        pathname: `/${currentUser.username}/chat`,
                        receiver: onlineUser
                        }} >
                            {onlineUser.username}
                        </Link>
                    </div>
                );            
            }
        });
    };

    const renderMyPostsList = (myPosts) => {
        return myPosts.map(post => {
            return (
                <div className="card" style={{width: "18rem"}} key={post._id}>
                    <div className="card-body">                    
                        <h5 className="card-title">{post.title}</h5>                   
                        <p className="card-text">{post.content}</p>

                        {post.postedBy === currentUser._id ? 
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
                                setPosts(_.remove(posts, (thisPost) => thisPost._id !== post._id ));
                            }}> Delete post </button>
                        </div>
                        : null}
                        
                        
                    </div>
                </div>
            );
        });
    };
    

    
    return (
        <div>
            Profile component
            <br/>
            {message}
            <br/>
            <button className="negative ui button" type="button" onClick={() => signOut(socket)}>
                Logout
            </button>
            <ul>
            {createOnlineUsersList(onlineUsers)}
            {renderMyPostsList(posts)}
            </ul>
            <br/>
            <br/>
            <br/>

            
            <button className="positive ui button" type="button">
                <Link to={{
                    pathname: `/${currentUser.username}/createpost`,
                    formAction:"create"
                }} >
                    Create new post
                </Link>
            </button>

            <br/>
            <br/>

            <br/>
            <br/>

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        message: state.auth.message,
        currentUser:state.auth.currentUser,
        socket:state.auth.socket        
    };
}

export default connect(mapStateToProps,{
    signOut,
    fetchMyPosts,
    deletePost
})(Profile);
