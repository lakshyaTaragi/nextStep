import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { unreadInfo, createChatList } from '../actions';
import UserTag from './UserTag';


const ChatHead = (props) => {
    
    const [unread, setUnread] = useState({});
    const { currentUserId, socket,                      //state
        createChatList, unreadInfo,                     //a.c.
        roomId, personInfo, setChatInfo } = props;      //parent
    const { name, username, isMentor } = personInfo;
   

   
    useEffect(() => {
        unreadInfo(roomId, currentUserId)
        .then(res => setUnread(res));

        socket.on('loadChat', (newMessage, id, isNewRoom) => {
            if(isNewRoom){
                createChatList(currentUserId)
                .then(res => setChatInfo(res));
            } else if(id==roomId){
                unreadInfo(roomId, currentUserId)
                .then(res => {
                    setChatInfo((old) => 
                        [_.find(old, { '_id': id }),..._.pullAllBy(old, [{'_id':id}], '_id')]
                    );
                    setUnread(res);
                });
            }
        });
       return () => socket.removeListener('loadChat');       
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
    unreadInfo, 
    createChatList
})(ChatHead);

