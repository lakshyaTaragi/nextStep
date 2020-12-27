import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import _ from 'lodash';

// socket --> //! try to move to api folder later
import { io } from 'socket.io-client';

import { signOut, fetchMyPosts } from '../../actions';






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
                <div className="item" key={post._id}>
                    <Link to={{
                    pathname: `/${props.currentUser.username}/updatepost`,
                    formAction:"update",
                    postValues: post
                    }} >
                        <div className="post-title">{post.title}</div>
                    </Link>                    
                        <div className="post-content">{post.content}</div>
                        <hr/>
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
    fetchMyPosts
})(Profile);
