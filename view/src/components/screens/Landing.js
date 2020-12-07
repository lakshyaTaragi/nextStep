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
                <Link to='/signup/mentor'>Mentor</Link>                <br/>                <Link to='/signup/mentee'>Mentee</Link>
            </div>
            <Link to="/home">Go to home page</Link>
        </div>
    );
};

export default Landing;