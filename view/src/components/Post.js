import React from 'react';
import { Link } from 'react-router-dom';
import {} from 'react-redux';

const Post = ({post, username}) => {
    return (
        <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content}</p>
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <Link className="btn btn-warning" to={{
                        pathname: `/${username}/updatepost`,
                        formAction:"update",
                        postValues: post
                    }} >
                    Update post
                    </Link>
                    
                    <a href="#" className="btn btn-danger">Delete post</a>  
                
                </div>
            </div>
        </div>
    );
};



export default Post;