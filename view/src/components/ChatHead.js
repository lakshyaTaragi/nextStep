import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import _ from 'lodash';
// import history from '../history';

import mentor from './screens/mentor.png'; 
import mentee from './screens/mentee.png'; 

import { unreadInfo } from '../actions';


const ChatHead = ({ roomId }) => {
    
    const [unread, setUnread] = useState({});
    
    useEffect(() => {
        // unreadInfo(roomId)
        // .then(res => setUnread(res));
    }, []);

    return (
        <div className="ui feed">
            ChatHead component
            {/* <div className="event">
                <div className="label">
                    <img src={isMentor ? mentor:mentee}/>
                </div>
                <div className="content">
                    <div className="summary">
                        <Link 
                            className="user"
                            to={{
                                pathname: `/profile/${username}`,
                                state: {
                                    userId: userId
                                }
                            }}
                        >
                            {name}
                            <br/>
                            <div className="meta">
                            @{username}
                            </div>
                        </Link> 
                        
                        added you as a friend
                        <div className="date">
                        1 Hour Ago
                        </div>
                    </div>
                    <div className="meta">
                        <a className="like">
                        <i className="like icon"></i> 4 Likes
                        </a>
                    </div>
                </div>
            </div>   */}
        </div>
    );
}

// const mapStateToProps = state => ({currentUser:state.auth.currentUser});

export default connect(null, {
    unreadInfo
})(ChatHead);