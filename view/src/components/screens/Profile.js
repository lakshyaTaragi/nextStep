import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import _ from 'lodash';

import { populateInfo, renderImageFromDB } from '../../actions';
import Post from '../Post';

import defaultpic from './defaultpic.jpg';


const Profile = (props) => {
    
    const [content, setContent] = useState({posts: [], extraInfo: {}})

    const { cu,                                                     //store
         populateInfo, renderImageFromDB,                           //ac
         location: {state: {userId}}} = props;                      //from location(history)
    
    
    useEffect(() => 
        populateInfo(userId)
        .then(response => 
            setContent({
                posts: response.myPosts, 
                extraInfo: _.omit(response, 'myPosts')
        }))  
    ,[]);



    // const createOnlineUsersList = (onlineUsers) => {    //! online users/chat list/ IN GENERAL ANY USER LIST
    //     return onlineUsers.map(onlineUser => {
    //         if(onlineUser.id!==cu._id){
    //             return (
    //                 <div key={onlineUser._id}>
    //                     <Link className="btn btn-success" key={onlineUser.id} onClick={() => localStorage.setItem('receiver',JSON.stringify(onlineUser))} to={{
    //                     pathname: `/${cu.username}/chat`,
    //                     }} >
    //                         {onlineUser.username}
    //                     </Link>
    //                 </div>
    //             );            
    //         }
    //     });
    // };

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
                            renderImageFromDB(extraInfo.profilePicture,"circular")
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

    const renderNewPostButton = (userId) => {
        if(userId===cu._id){
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

    const renderMessageButton = (userId) => {
        if(userId!==cu._id){
            const {_id, name, username, profilePicture, isMentor} = content.extraInfo;
            return (
                <button className="ui button" type="button">
                    <Link 
                        to={{
                            pathname: `/${cu.username}/chat`,
                            state: {_id, name, username, profilePicture, isMentor}
                        }}
                    >
                        Send message
                    </Link>
                </button>
            );
        }
    }
    

    return (
        <div>

            {renderProfileInfo(content.extraInfo)}

            {renderMessageButton(userId)}

            {renderPostsList(content.posts)}

            {renderNewPostButton(userId)}

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

