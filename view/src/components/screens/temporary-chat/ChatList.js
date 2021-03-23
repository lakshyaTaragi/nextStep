import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { createChatList, renderImageFromDB } from '../../../actions';
import ChatHead from '../../ChatHead';
import defaultpic from '../defaultpic.jpg';

const ChatList = (props) => {
    const { currentUserId, createChatList, renderImageFromDB} = props;
    
    const [chatInfo, setChatInfo] = useState(false);

    useEffect(() => {
        createChatList(currentUserId)
        .then(res => setChatInfo(res));    
    },[]);

    
    const renderChatList = (chatInfo) => {
        if(chatInfo && chatInfo.length>0){
            return chatInfo.map(chat => {
                if(chat){
                    // chat destructuring
                    const {name, username, isMentor, profilePicture, _id} = chat.members[0];
                    // console.log(chat.members[0]);    
    
                    return (
                        <React.Fragment key={_id}>
                            <div className="item">
                            <a className="ui tiny image">
                                {profilePicture ? renderImageFromDB(profilePicture, "") : <img src={defaultpic} />}
                            </a>
                            <div className="content">
                                <ChatHead 
                                    roomId={chat._id} 
                                    personInfo={{name, username, isMentor}} 
                                    setChatInfo={setChatInfo}
                                />
                            </div>
                            </div>
                        </React.Fragment>
                    );
                }
            })
        } else if(chatInfo && chatInfo.length===0){
            return <div className="ui message red">No current chats</div>
        } else if (!chatInfo){
            return (
                <div className="ui segment">
                    <div className="ui active centered inline loader"></div>
                    <p></p>
                </div>
            );
        }
    }

    return (
        <div className="ui container">
            <div className="ui divided items">
                {renderChatList(chatInfo)}
            </div>
        </div>	
    );
};



const mapStateToProps = state => ({
    currentUserId: state.auth.currentUser._id
});

export default connect(mapStateToProps, {
    createChatList, 
    renderImageFromDB
})(ChatList);
