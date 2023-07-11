import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import _ from 'lodash';

import { populateInfo, renderImageFromDB, followToggle } from '../../actions';
import Post from '../Post';
import Chat from './temporary-chat/Chat';

import defaultpic from './defaultpic.jpg';


const Profile = (props) => {
    console.log()
    
    const [content, setContent] = useState({posts: [], extraInfo: {}})
    const [chatOpen, setChatOpen] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const { cu,                                                     //store
         populateInfo, renderImageFromDB, followToggle,                           //ac
         match: {params: {username}},                               //from location(history)
         location} = props;
    
    
    
    
    useEffect(() => 
        populateInfo(username)
        .then(response => {
            // console.log(response);
            setIsFollowing(_.includes(response.followers, cu._id));
            setContent({
                posts: response.myPosts, 
                extraInfo: _.omit(response, 'myPosts')
            });
        })  
    ,[]);

    // useEffect(() => {

    // }, [isFollowing]);

    const renderPostsList = (myPosts) => {
        return myPosts.map(post => {
            return <Post postId={post._id} key={post._id} />;
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
                                
                                <div>From: {extraInfo.hometown}</div>
                                
                                <div>School: {extraInfo.school.name} ({extraInfo.school.city})</div>
                                
                                {extraInfo.coaching &&
                                    <div>Coaching: {extraInfo.coaching.name} ({extraInfo.coaching.city})</div>
                                }
                                
                                {extraInfo.isMentor?<div>College: {extraInfo.college.name}</div>:null}

                                <div>Followers = {extraInfo.followers.length}</div>
                                <div>Following = {extraInfo.following.length}</div>

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

    const renderFollowButton = (extraInfo) => {
        // let isFollower = _.includes(extraInfo.follwers, cu._id);
        
        return (
            <button 
                className="ui button" 
                type="button" 
                onClick={() => {
                    // console.log(isFollower); 
                    followToggle(cu._id, content.extraInfo._id, isFollowing);
                    
                    //! later --> we need only numbers for followers and following
                    // const ef = {...extraInfo};
                    // let temp = ef.following.length;
                    // ef.following.length = isFollowing ? temp-1 : temp+1;
                    // setContent(ef);

                    setIsFollowing(!isFollowing);
                }}
            >
                {isFollowing ? 'Unfollow -' : 'Follow +'}
            </button>
        );
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

            {content.extraInfo._id !== cu._id && renderFollowButton(content.extraInfo)}
     
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
    renderImageFromDB,
    followToggle
})(Profile);

