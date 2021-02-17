import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchUsersByIds, createChatList, renderImageFromDB } from '../../../actions';
import ChatHead from '../../ChatHead';
import defaultpic from '../defaultpic.jpg';

const ChatList = (props) => {
    const {fetchUsersByIds, currentUserId, socket, createChatList, renderImageFromDB} = props;
    // console.log(_.map(chatRooms, 'person'));
    
    const [chatInfo, setChatInfo] = useState(false);

    useEffect(() => {
        createChatList(currentUserId)
        .then(res => setChatInfo(res));        
    },[]);

    const renderChatList = (chatInfo) => {
        if(chatInfo && chatInfo.length>0){
            return chatInfo.map(chat => {
                // chat destructuring
                const {name, username, isMentor} = chat.person;
                // console.log({name, username, isMentor});

                return (
                    <React.Fragment key={chat._id}>
                        <div className="item">
                        <a className="ui tiny image">
                            {chat.person.profilePicture ? renderImageFromDB(chat.person.profilePicture, "") : defaultpic}
                        </a>
                        <div className="content">
                            <ChatHead roomId={chat.chatRoom} personInfo={{name, username, isMentor}} />
                        </div>
                        </div>
                    </React.Fragment>
                );
            })
        } else {
            return <div className="ui message red">No current chats</div>
        }
    }

    return (
        <div className="ui container">
            <div className="ui divided items">
                {/* {renderChatList(chatInfo)} */}
            </div>
        </div>	
    );
};



const mapStateToProps = state => ({
    socket: state.auth.socket,
    currentUserId: state.auth.currentUser._id
});

export default connect(mapStateToProps, {
    fetchUsersByIds,
    createChatList, 
    renderImageFromDB
})(ChatList);
