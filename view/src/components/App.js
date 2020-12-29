import React from 'react';
import { Router, Route}  from 'react-router-dom'
import { connect } from 'react-redux';
import { io } from 'socket.io-client';
import _ from 'lodash';

import Landing from './screens/Landing';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Signup from './forms/signup-form/Signup';
import SignIn from './forms/SignIn';
import Post from './forms/PostForm';

import history from '../history';
import { signOut, saveSocket } from '../actions';

import AllChats from './screens/temporary-chat/AllChats';
import Chat from './screens/temporary-chat/Chat';


const App = (props) => {

    
    const { currentUser, socket, signOut, saveSocket} = props;
    console.log(currentUser);
    
    if(currentUser && !socket){
        
        const socketInst =  io('localhost:5000/'); //! ~localhost:5000/chat later
        var room;
        if(currentUser._id) room = currentUser._id.toString();
        socketInst.on('connect', () => socketInst.emit('privateRoom',room));
        // ? socketInst.emit('iAmOnline', currentUser)
        
        saveSocket(socketInst);
     
    }
    

    const authenticatedRoute = (Component,routeName) => {
        return(
            <Route
                path={`/:username/${routeName}`}
                exact
                render={(propers) => {
                        const { match: { params } } = propers;
                        if(currentUser && params.username===currentUser.username){
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
                

                {authenticatedRoute(Profile,'profile')}

                {authenticatedRoute(Post,'createpost')}
                {authenticatedRoute(Post,'updatepost')}
                {authenticatedRoute(Chat,'chat')}

                <Route path="/allchats" exact component={AllChats} />


            </Router>
            {!_.isEmpty(currentUser)?<button className="negative ui button" type="button" onClick={() => signOut(socket)}>
                Logout
            </button>:null}
            

        </div>
    );
};

const mapStateToProps = state => {
    return {
        currentUser:state.auth.currentUser,
        socket: state.auth.socket
    };
};

export default connect(mapStateToProps, {
    signOut,
    saveSocket
})(App);

