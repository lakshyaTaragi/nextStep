import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchUsersPosts, populateInfo, renderImageFromDB } from '../../actions';
import Post from '../Post';

import defaultpic from './defaultpic.jpg';


const Profile = (props) => {
    
    const [posts, setPosts] = useState([]); 
    const [extraInfo, setExtraInfo] = useState({});
    
    // , meta: { touched, error }
    // const { userId } = props.location.state;
    const { cu,                                                     //store
         fetchUsersPosts, populateInfo, renderImageFromDB,          //ac
         location: {state: {userId}}} = props;                      //from location(history)
    
    // var userId;                                                                 //! CHECK THIS LATER
    // if(!_.isEmpty(props.location)) userId = props.location.userId;
    // else userId = cu._id;
    
    
    useEffect(()=>{
        
        fetchUsersPosts(userId)
        .then(response => setPosts(response));

        populateInfo(userId)
        .then(response => setExtraInfo(response));  

    },[]);



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
    

    return (
        <div>

            {renderProfileInfo(extraInfo)}

            {renderPostsList(posts)}

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
    fetchUsersPosts,
    populateInfo,
    renderImageFromDB
})(Profile);

