import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchUsersByIds, createChatList } from '../../../actions';
import ChatHead from '../../ChatHead';

const ChatList = (props) => {
    const {fetchUsersByIds, currentUserId, socket, createChatList} = props;
    // console.log(_.map(chatRooms, 'person'));
    
    // useEffect(() => {
        
    // },[]);
    createChatList(currentUserId);
    return (

        <div>Chat List</div>
	
    );
};



const mapStateToProps = state => ({
    socket: state.auth.socket,
    currentUserId: state.auth.currentUser._id
});

export default connect(mapStateToProps, {
    fetchUsersByIds,
    createChatList
})(ChatList);
