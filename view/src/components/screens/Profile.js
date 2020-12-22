import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

// socket --> //! try to move to api folder later
import { io } from 'socket.io-client';

import { signOut } from '../../actions';





const Profile = (props) => {
    const socket = io('localhost:5000/'); //! ~localhost:5000/chat later

    const [onlineUsers,setOnlineUsers] = useState([]); 

    useEffect(()=>{
        // console.log('initial render');
        var room = props.currentUser._id.toString();
        
        socket.on('connect', () => {
            // console.log('online',socket.id);
            socket.emit('iAmOnline',props.currentUser);
            socket.emit('privateRoom',room);
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
            return (
                <div className="item" key={onlineUser}>
                    <img className="ui avatar image" src="/images/avatar/small/daniel.jpg" />
                    <div className="content">
                    <div className="header">Paulo</div>
                    This is {onlineUser}
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
            </ul>
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
})(Profile);
