import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import _ from 'lodash';
import defaultpic from './defaultpic.jpg'


//! try to move to api folder later

import { signOut, fetchMyPosts, deletePost, fetchPostById, populateInfo, getImage } from '../../actions';

import Post from '../Post';


const Profile = (props) => {
    
    
    const [onlineUsers, setOnlineUsers] = useState([]); 

    const [posts, setPosts] = useState([]); 
    const [extraInfo, setExtraInfo] = useState({});
    const [imageData, setImageData] = useState('');
    
    const { cu, socket, fetchMyPosts, fetchPostById, signOut, deletePost, message, populateInfo, getImage } = props;
    
    
    useEffect(()=>{
        fetchMyPosts(cu._id)
        .then(response => setPosts(response));
        
        // ! hardcoded for now
        setOnlineUsers([
            {
                username:"a",
                id:"5feb5cabf03208381cfd245f"
            },
            {
                username:"b",
                id:"5feb5cb2f03208381cfd2463"
            },
            {
                username:"c",
                id:"5feb5cc1f03208381cfd2467"
            }
        ]);

        populateInfo(cu.username)
        .then(response => setExtraInfo(response));
  

    },[]);



    const createOnlineUsersList = (onlineUsers) => {
        return onlineUsers.map(onlineUser => {
            if(onlineUser.id!==cu._id){
                return (
                    <div>
                        <Link className="btn btn-success" key={onlineUser.id} onClick={() => localStorage.setItem('receiver',JSON.stringify(onlineUser))} to={{
                        pathname: `/${cu.username}/chat`,
                        }} >
                            {onlineUser.username}
                        </Link>
                    </div>
                );            
            }
        });
    };

    const renderMyPostsList = (myPosts) => {
        return myPosts.map(post => {
            return <Post postId={post._id} setPosts={setPosts} posts={posts} />;
        });
    };

    const renderImageFromDB = () => {
        const dp = extraInfo.profilePicture.img.data.data;
        let TYPED_ARRAY = new Uint8Array(dp);
        const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
        let base64String = btoa(STRING_CHAR);
        return <img className="ui small circular image" src={`data:image/png;base64,${base64String}`}/>
    }

    // ! deal about page refreshing on delete post
    const renderProfileInfo = extraInfo => {
        if(!_.isEmpty(extraInfo)){            
     

            return (
                <div className="ui items">
                    <div className="item">
                        {extraInfo.profilePicture ? renderImageFromDB():<img className="ui small circular image" src={defaultpic} />}
                        
                        
                       
                        
                        
                        <div className="content">
                        <a className="header">{extraInfo.name}</a>
                        <div className="meta">
                            <span>{`@${extraInfo.username}`}</span>
                        </div>
                        <div className="description">
                            <p></p>
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
    
    
    
    
    return (
        <div>
            Profile component
            <br/>
            
   
            
 
            {renderProfileInfo(extraInfo)}




            {message}
            <br/>
            <button className="negative ui button" type="button" onClick={() => signOut(socket)}>
                Logout
            </button>
            <ul>
            {createOnlineUsersList(onlineUsers)}
            {renderMyPostsList(posts)}
            </ul>
            <br/>
            <br/>
            <br/>


            <br/>
            <br/>
            <br/>
            
            <button className="positive ui button" type="button">
                <Link to={{
                    pathname: `/${cu.username}/createpost`,
                    formAction:"create"
                }} >
                    Create new post
                </Link>
            </button>

            <br/>
            <br/>

            <br/>
            <br/>

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        message: state.auth.message,
        cu:state.auth.currentUser,
        socket:state.auth.socket        
    };
}

export default connect(mapStateToProps,{
    signOut,
    fetchMyPosts,
    fetchPostById,
    deletePost,
    populateInfo,
    getImage
})(Profile);
