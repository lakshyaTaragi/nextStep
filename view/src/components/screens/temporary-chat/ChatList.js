import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchUsersByIds, newChatRoom } from '../../../actions';
import ChatHead from '../../ChatHead';

const ChatList = (props) => {
    const {fetchUsersByIds, chatRooms, newChatRoom, socket} = props;
    console.log(_.map(chatRooms, 'person'));
    
    // useEffect(() => {
        
    // },[]);

    return (

        <div>Chat List</div>
	
    );
};



const mapStateToProps = state => ({
    chatRooms: state.auth.currentUser.chatRooms,
    socket: state.auth.socket
});

export default connect(mapStateToProps, {
    fetchUsersByIds,
    newChatRoom
})(ChatList);
