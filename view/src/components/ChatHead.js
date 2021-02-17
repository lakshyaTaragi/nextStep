import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { unreadInfo } from '../actions';
import UserTag from './UserTag';


const ChatHead = (props) => {
    
    const [unread, setUnread] = useState({});
    const { currentUserId, roomId, personInfo, unreadInfo, socket } = props;
    const { name, username, isMentor } = personInfo;
   

   
    useEffect(() => {
        unreadInfo(roomId, currentUserId)
        .then(res => setUnread(res));

        //! PROBABLY WONT BE NEEDED
        // socket.on('loadChat') receive chat id if it matches then refetch
        
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
                <div className="ui message">
                    {unread.unread>0 ?
                    <h5 className="ui header">
                        {unread.unread>0?unread.last:''}
                    </h5>:<div>{unread.last}</div>
                    }
                    
                        
                    {
                        unread.unread>0 && 
                        <a className="ui red circular label">{unread.unread} new message{unread.unread>1?'s':''}</a>
                    }                    
                </div>
            }
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    currentUserId:state.auth.currentUser._id,
    socket: state.auth.socket
});

export default connect(mapStateToProps, {
    unreadInfo
})(ChatHead);

