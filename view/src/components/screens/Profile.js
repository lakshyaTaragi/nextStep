import React from 'react';
import { connect } from 'react-redux';

import { signOut } from '../../actions';


// socket --> //! try to move to api folder later
import { io } from 'socket.io-client';


const Profile = (props) => {
    
    if(props.currentUser){        
        const socket = io('localhost:5000/'); //! ~localhost:5000/chat later
        socket.on('connect', () => console.log('online')); 
    }     
    
    return (
        <div>
            Profile component
            <br/>
            {props.message}
            <br/>
            <button className="negative ui button" type="button" onClick={props.signOut}>
                Logout
            </button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        message: state.auth.message,
        currentUser:state.auth.currentUser
    };
}

export default connect(mapStateToProps,{
    signOut
})(Profile);
