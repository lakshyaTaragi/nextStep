import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { signOut } from '../../actions';


// socket --> //! try to move to api folder later
import { io } from 'socket.io-client';



const Profile = (props) => {

    const [onlineUsers,setOnlineUsers] = useState([]);
    
    var room = props.currentUser._id.toString();
    console.log(room);
       
    const socket = io('localhost:5000/',props.currentUser); //! ~localhost:5000/chat later
    socket.on('connect', () => {
        console.log('online',socket.id);
        socket.emit('iAmOnline',props.currentUser);
        socket.emit('privateRoom',room);
        
    });

    

   
    
    
    

    const createOnlineUser = (onlineUser) => {
        return (
            <div class="item">
                <img class="ui avatar image" src="/images/avatar/small/daniel.jpg" />
                <div class="content">
                <div class="header">Paulo</div>
                This is {onlineUser}
                </div>
            </div>
        );
    };
    
    return (
        <div>
            Profile component
            <br/>
            {props.message}
            <br/>
            <button className="negative ui button" type="button" onClick={props.signOut}>
                Logout
            </button>
            {/* {props.onlineUsers.array.forEach(onlineUser => {
                
            });} */}
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
