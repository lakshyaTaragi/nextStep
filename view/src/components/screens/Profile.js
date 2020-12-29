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
        fetchMyPosts(currentUser._id)
        .then(response => setPosts(response));
        
        // ! hardcoded for now
        setOnlineUsers([
            {
                username:"a",
                id:"5fea37682032710d4c5040f0"
            },
            {
                username:"b",
                id:"5fea37712032710d4c5040f4"
            },
            {
                username:"c",
                id:"5feaffa316dcd7297865edec"
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
