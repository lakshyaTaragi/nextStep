import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import _ from 'lodash';

import { populateInfo, renderImageFromDB } from '../../actions';
import Post from '../Post';
import Chat from './temporary-chat/Chat';

import defaultpic from './defaultpic.jpg';


const Profile = (props) => {
    console.log()
    
    const [content, setContent] = useState({posts: [], extraInfo: {}})
    const [chatOpen, setChatOpen] = useState(false);

    const { cu,                                                     //store
         populateInfo, renderImageFromDB,                           //ac
         match: {params: {username}},                               //from location(history)
         location} = props;
    
    
    
    
    useEffect(() => 
        populateInfo(username)
        .then(response => 
            setContent({
                posts: response.myPosts, 
                extraInfo: _.omit(response, 'myPosts')
        }))  
    ,[]);

    const renderPostsList = (myPosts) => {
        return myPosts.map(post => {
            return <Post postId={post._id}/>;
        });
    }

    const renderProfileInfo = extraInfo => {
        
        if(!_.isEmpty(extraInfo)){         
     
            return (
                <div className="ui items">
                    <div className="item">
                        
                        {extraInfo.profilePicture ? 
                            renderImageFromDB(extraInfo.profilePicture,"small circular")
                            :<img className="ui small circular image" src={defaultpic} 
                        />}                     
                                               
                        <div className="content">

                            <a className="header">  {extraInfo.name}    </a>

                            <div className="meta">
                                <span>{`@${extraInfo.username}`}</span>
                            </div>

                            <div className="extra">
                                
                                <div>From: {extraInfo.city}</div>
                                
                                <div>School: {extraInfo.school.name} ({extraInfo.school.city})</div>
                                
                                <div>Coaching: {extraInfo.coaching.name} ({extraInfo.coaching.city})</div>
                                
                                {extraInfo.isMentor?<div>College: {extraInfo.college.name}</div>:null}

                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    const renderNewPostButton = (username) => {
        if(username===cu.username){
            return (
                <button className="ui button" type="button">
                    <Link to={{
                        pathname: `/${cu.username}/createpost`,
                        formAction:"create"
                    }} >
                        Create new post
                    </Link>
                </button>
            );
        }
    }

    const renderToggleButton = (username) => {
        if(username!==cu.username){          
            return (
                <button className="ui button" type="button" onClick={() => setChatOpen(!chatOpen)}>
                        {chatOpen ? 'View Profile' : 'Send message'}
                </button>
            );
        }
    }
    
    return (
        <div>

            {renderProfileInfo(content.extraInfo)}
     
            {renderToggleButton(username)}

            {(!chatOpen && !location.forChat) && renderPostsList(content.posts)}

            {(!chatOpen && !location.forChat) && renderNewPostButton(username)}
            
            {!_.isEmpty(content.extraInfo) && (chatOpen || location.forChat) && <Chat receiver={content.extraInfo} />}

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        cu:state.auth.currentUser    
    };
}

export default connect(mapStateToProps,{
    populateInfo,
    renderImageFromDB
})(Profile);

