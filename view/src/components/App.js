import React from 'react';
import { BrowserRouter, Route}  from 'react-router-dom'

import Landing from './screens/Landing';
import Home from './screens/Home';
import Profile from './screens/Profile';
import MentorSignup from './forms/MentorSignup';
import MenteeSignup from './forms/MenteeSignup';


const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Route path="/" exact component={Landing} />
                <Route path="/home" exact component={Home} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/signup/mentor" exact component={MentorSignup} />
                <Route path="/signup/mentee" exact component={MenteeSignup} />
            </BrowserRouter>
        </div>
    );
};

export default App;