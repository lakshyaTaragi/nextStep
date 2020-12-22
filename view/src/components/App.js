import React from 'react';
import { Router, Route}  from 'react-router-dom'
import { connect } from 'react-redux';

import Landing from './screens/Landing';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Signup from './forms/signup-form/Signup';
import SignIn from './forms/SignIn';
import Post from './forms/Post';

import history from '../history';
import { signOut } from '../actions';

import AllChats from './screens/temporary-chat/AllChats';
import Chat from './screens/temporary-chat/Chat';


const App = (props) => {

    //TODO: DELETE later
    console.log(JSON.parse(localStorage.getItem('currentUser')));

    const authenticatedRoute = (Component,routeName) => {
        return(
            <Route
                path={`/:username/${routeName}`}
                exact
                render={(propers) => {
                        const { match: { params } } = propers;
                        if(props.currentUser && params.username===props.currentUser.username){
                            return <Component {...propers}/>;
                        } else{
                            return history.push('/signin');
                        }                        
                    }                        
                }
            />
        );
    }; 

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
                            if(props.currentUser) console.log(props.currentUser.username);
                            if(props.currentUser && params.username===props.currentUser.username){
                                return <Profile {...propers}/>;
                            } else{
                                return history.push('/signin');
                            }                        
                        }                        
                    }
                />

                {authenticatedRoute(Post,'createpost')}

                <Route path="/allchats" exact component={AllChats} />
                <Route path="/chat" exact component={Chat} />


            </Router>
            {props.currentUser?<button className="negative ui button" type="button" onClick={props.signOut}>
                Logout
            </button>:null}
            

        </div>
    );
};

const mapStateToProps = state => {
    return {currentUser:state.auth.currentUser};
};

export default connect(mapStateToProps, {
    signOut
})(App);

