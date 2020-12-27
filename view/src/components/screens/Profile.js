import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import _ from 'lodash';

// socket --> //! try to move to api folder later
import { io } from 'socket.io-client';

import { signOut, fetchMyPosts, deletePost } from '../../actions';

import Post from '../Post';





const Profile = (props) => {
    const socket = io('localhost:5000/'); //! ~localhost:5000/chat later

    const [onlineUsers, setOnlineUsers] = useState([]); 
    const [posts, setPosts] = useState([]); 
    

    useEffect(()=>{

        var room = props.currentUser._id.toString();
        
        socket.on('connect', () => {
            // console.log('online',socket.id);
            socket.emit('iAmOnline',props.currentUser);
            socket.emit('privateRoom',room);
        });
        // fetch personal posts
        props.fetchMyPosts(props.currentUser._id)
        .then((response) => {
            // console.log(response);
            setPosts(response);
        });
    },[]);
    

    socket.on('onlineUsers',(clients) => {
        setOnlineUsers(clients);
        // console.log(onlineUsers);
    });

    


    const signoutAndLeaveRoom = () =>{
        props.signOut();
        socket.emit('signout');
    }

    // const deletePostAndRemove = () => {

    // }
    

    const createOnlineUsersList = (onlineUsers) => {
        return onlineUsers.map(onlineUser => {
            if(onlineUser!==props.currentUser._id){
                return (
                    <div className="item" key={onlineUser}>
                        <img className="ui avatar image" src="/images/avatar/small/daniel.jpg" />
                        <div className="content">
                        <div className="header">Paulo</div>
                        This is {onlineUser}
                        </div>
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

                        {post.postedBy === props.currentUser._id ? 
                            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                            <Link className="btn btn-warning" to={{
                            pathname: `/${props.currentUser.username}/updatepost`,
                            formAction:"update",
                            postValues: post
                            }} >
                                Update post
                            </Link>
                            <button className="btn btn-danger" onClick={() => {
                                props.deletePost(post._id);
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
            {props.message}
            <br/>
            <button className="negative ui button" type="button" onClick={signoutAndLeaveRoom}>
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
                    pathname: `/${props.currentUser.username}/createpost`,
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
    };
}

export default connect(mapStateToProps,{
    signOut,
    fetchMyPosts,
    deletePost
})(Profile);
