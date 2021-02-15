import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { unreadInfo } from '../actions';
import UserTag from './UserTag';


const ChatHead = ({ currentUserId, roomId, personInfo }) => {
    
    const [unread, setUnread] = useState({});
    const { name, username, isMentor } = personInfo;

    useEffect(() => {
        unreadInfo(roomId, currentUserId)
        .then(res => setUnread(res));
    }, []);

    return (
        <React.Fragment>
            <UserTag 
                name = {name}
                username = {username}
                linkObj = {
                    {
                        pathname: `/profile/${username}`,
                        forChat: true
                    }
                }
                isMentor = {isMentor} 
            />
            {
                unread && 
                <div class="ui compact message">
                    <p>{unread.last}</p>
                    {
                        unread.unread && 
                        <a class="ui red circular label">{unread.unread}</a>
                    }                    
                </div>
            }
        </React.Fragment>
    );
}

const mapStateToProps = state => ({currentUserId:state.auth.currentUser._id});

export default connect(mapStateToProps, {
    unreadInfo
})(ChatHead);

