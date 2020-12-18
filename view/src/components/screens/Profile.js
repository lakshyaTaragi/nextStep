import React from 'react';
import { connect } from 'react-redux';

import { signOut, allOnlineUsers, addOnlineUser } from '../../actions';


// socket --> //! try to move to api folder later
import { io } from 'socket.io-client';



const Profile = (props) => {
    
       
    const socket = io('localhost:5000/'); //! ~localhost:5000/chat later
    
    socket.on('connect', () => {
        console.log('online',socket.id);
        socket.emit('userComesOnline', props.currentUser);
    });
    
    socket.on('allOnlineUsers',(allOnlineUsers)=>{
        props.allOnlineUsers(allOnlineUsers);
    });

    socket.on('newOnlineUser',(newUser)=>{
        props.addOnlineUser(newUser);
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
        onlineUsers:state.auth.onlineUsers
    };
}

export default connect(mapStateToProps,{
    signOut,
    allOnlineUsers,
    addOnlineUser
})(Profile);
