import React from 'react';
import { Router, Route, Switch}  from 'react-router-dom'

import Landing from './screens/Landing';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Signup from './forms/signup-form/Signup';
import SignIn from './forms/SignIn';

import history from '../history';



const App = () => {
    return (
        <div>
            <Router history={history}>
                
                <Route path="/" exact component={Landing} />
                
                <Route path="/home" exact component={Home} />
                
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
                
                <Route path="/:id/profile" exact component={Profile} />

            </Router>
        </div>
    );
};

export default App;