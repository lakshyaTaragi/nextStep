import React from 'react';
import { BrowserRouter, Route}  from 'react-router-dom'

import Landing from './screens/Landing';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Signup from './forms/signup-form/Signup';
import SignIn from './forms/SignIn';



const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Route path="/" exact component={Landing} />
                <Route path="/home" exact component={Home} />
                <Route path="/profile" exact component={Profile} />
                <Route
                    path='/signup/mentor'
                    render={(props) => (
                        <Signup {...props} isMentor={true} />
                    )}
                />
                <Route
                    path='/signup/mentee'
                    render={(props) => (
                        <Signup {...props} isMentor={false} />
                    )}
                />
                <Route path="/signin" exact component={SignIn} />
            </BrowserRouter>
        </div>
    );
};

export default App;