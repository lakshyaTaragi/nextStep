import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div>
            <div>
                Basic explanation
            </div>
            Register as a:
            <div>
                
                <Link to={{
                    pathname: '/signup/mentor',
                    state: {
                        isMentor: true
                    }
                }}>
                    Mentor
                </Link>
                
                <br/>
                
                <Link to={{
                    pathname: '/signup/mentee',
                    state: {
                        isMentor: false
                    }
                }}>
                    Mentee
                </Link>

            </div>
            <Link to="/home">Go to home page</Link>
        </div>
    );
};

export default Landing;