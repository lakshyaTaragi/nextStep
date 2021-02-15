import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import _ from 'lodash';

import {  fetchAllPosts , renderImageFromDB } from '../../actions';

import Post from '../Post';
import ChatList from './temporary-chat/ChatList';

const Home = (props) => {

    // !Here comes the feed
    console.log(props);

    const [posts, setPosts] = useState([]);

    const { cu, socket,                         //store
        fetchAllPosts, renderImageFromDB         //ac
       } = props;

       useEffect(()=>{
        
        // fetchAllPosts --> render in reverse order
        fetchAllPosts()
        .then(response => setPosts(response));
        
        // // ! hardcoded for now
        // setOnlineUsers([
        //     {
        //         username:"a",
        //         id:"5feb5cabf03208381cfd245f"
        //     },
        //     {
        //         username:"b",
        //         id:"5feb5cb2f03208381cfd2463"
        //     },
        //     {
        //         username:"c",
        //         id:"5feb5cc1f03208381cfd2467"
        //     }
        // ]); 

    },[]);

    const renderPostsList = (myPosts) => {
        return _.reverse(myPosts).map(post => {
            return <Post postId={post._id} setPosts={setPosts} posts={posts} />;
        });
    };

    return (
        <div className="main ui container">
            <div className="ui segment">
                <div className="ui left rail">
                    <div className="ui segment">
                    Left Rail Content Left Rail ContentLeft Rail ContentLeft Rail ContentLeft Rail ContentLeft Rail Content
                    </div>
                </div>
                <div className="ui right close rail">
                    <div className="ui segment">
                    <ChatList/>
                    </div>
                </div>
                <p>zxzxz</p>

                {renderPostsList(posts)}


                <p></p>
            </div>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        cu:state.auth.currentUser,
        socket:state.auth.socket        
    };
}

export default connect(mapStateToProps,{
    fetchAllPosts,
    renderImageFromDB
})(Home);