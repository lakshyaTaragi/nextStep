import React, { useState } from 'react';
import PropTypes from 'prop-types'; //! Learn about these

import FirstPage from './FirstPage';
import SecondPage from './SecondPage';

const Signup = ({isMentor}) => { 

    const [page, setPage] = useState(1);
     
    return (
        <div className="ui container  segment">

            <div className="ui form">

                <h3 className="ui block header">
                    Signup as {isMentor ? 'Mentor':'Mentee'} <i className="pen square icon"></i>
                </h3>

                {page===1 && <FirstPage onSubmit={() => setPage(page => page+1)} />}

                {page===2 && <SecondPage previousPage={() => setPage(page => page-1)} isMentor={isMentor}/>}

            </div>

        </div>
    );
    
};

Signup.propTypes = {
    isMentor: PropTypes.bool.isRequired
};

export default Signup;