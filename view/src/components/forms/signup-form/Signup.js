import React, { useState } from 'react';
import PropTypes from 'prop-types'; //! Learn about these

import FirstPage from './FirstPage';
import SecondPage from './SecondPage';

const Signup = ({isMentor}) => { 

    const [page, setPage] = useState(1);
     
    return (
        <div className="ui container placeholder segment">

            <h4 className="ui dividing header">
            Signup as {isMentor ? 'Mentor':'Mentee'}
            </h4>

            {page===1 && <FirstPage onSubmit={() => setPage(page => page+1)} />}

            {page===2 && <SecondPage previousPage={() => setPage(page => page-1)} isMentor={isMentor}/>}

        </div>
    );
    
};

Signup.propTypes = {
    isMentor: PropTypes.bool.isRequired
};

export default Signup;