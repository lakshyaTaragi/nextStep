import React from 'react';
import { Router, Route, Redirect}  from 'react-router-dom'
import { connect } from 'react-redux';

import Landing from './screens/Landing';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Signup from './forms/signup-form/Signup';
import SignIn from './forms/SignIn';

import history from '../history';


const App = (props) => {
    // console.log('Current User ', props.currentUser.username);
    console.log(JSON.parse(localStorage.getItem('currentUser')));
    return (
        <div>
            <Router history={history}>
                
                <Route path="/" exact component={Landing} />
                
                <Route path="/home" exact component={Home} />
                
                <Route
                    path='/signup/mentor'
                    exact
                    render={(props) => (
                        <Signup {...props} isMentor={true} />
                    )}
                />
                
                <Route
                    path='/signup/mentee'
                    exact
                    render={(props) => (
                        <Signup {...props} isMentor={false} />
                    )}
                />
                
                <Route path="/signin" exact component={SignIn} />
                
                <Route
                    path="/:username/profile"
                    exact
                    render={(propers) => {

                            const { match: { params } } = propers;
                            // console.log(params.username);
                            if(props.currentUser) console.log(props.currentUser.username);
                            if(props.currentUser && params.username===props.currentUser.username){
                                return <Profile {...propers}/>;
                            } else{
                                return history.push('/signin');
                            }                        
                        }                        
                    }
                />

            </Router>
        </div>
    );
};

const mapStateToProps = state => {
    return {currentUser:state.auth.currentUser};
};

export default connect(mapStateToProps)(App);

