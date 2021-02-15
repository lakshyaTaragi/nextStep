import React from 'react';
import { Link } from 'react-router-dom';

import mentor from './screens/mentor.png'; 
import mentee from './screens/mentee.png'; 

export default ({name, username, isMentor, linkObj}) => (
    <div className="ui feed">
        <div className="event">
            <div className="label">
                <img src={isMentor ? mentor:mentee}/>
            </div>
            <div className="content">
                <div className="summary">
                    <Link 
                        className="user"
                        to={linkObj}
                    >
                        {name}
                        <br/>
                        <div className="meta">
                        @{username}
                        </div>
                    </Link> 
                    
                    {/* added you as a friend
                    <div className="date">
                    1 Hour Ago
                    </div> */}
                </div>
                {/* <div className="meta">
                    <a className="like">
                    <i className="like icon"></i> 4 Likes
                    </a>
                </div> */}
            </div>
        </div>  
    </div>

);
