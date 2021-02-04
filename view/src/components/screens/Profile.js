import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import _ from 'lodash';

//! try to move to api folder later

import { signOut, fetchMyPosts, deletePost, fetchPostById } from '../../actions';

import Post from '../Post';


const Profile = (props) => {
    
    
    const [onlineUsers, setOnlineUsers] = useState([]); 

    const [posts, setPosts] = useState([]); 
    
    const { currentUser, socket, fetchMyPosts, fetchPostById, signOut, deletePost, message } = props;
    
    
    useEffect(()=>{
        fetchMyPosts(currentUser._id)
        .then(response => setPosts(response));
        
        // ! hardcoded for now
        setOnlineUsers([
            {
                username:"a",
                id:"5feb5cabf03208381cfd245f"
            },
            {
                username:"b",
                id:"5feb5cb2f03208381cfd2463"
            },
            {
                username:"c",
                id:"5feb5cc1f03208381cfd2467"
            }
        ]);

    },[]);



    const createOnlineUsersList = (onlineUsers) => {
        return onlineUsers.map(onlineUser => {
            if(onlineUser.id!==currentUser._id){
                return (
                    <div>
                        <Link className="btn btn-success" key={onlineUser.id} onClick={() => localStorage.setItem('receiver',JSON.stringify(onlineUser))} to={{
                        pathname: `/${currentUser.username}/chat`,
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
            return <Post postId={post._id} setPosts={setPosts} posts={posts} />;
        });
    };

    // ! deal about page refreshing on delete post
    

    
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
    fetchPostById,
    deletePost
})(Profile);
