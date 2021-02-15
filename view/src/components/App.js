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

import ChatList from './screens/temporary-chat/ChatList';
import Chat from './screens/temporary-chat/Chat';


const App = (props) => {

    
    const { currentUser, socket, signOut, saveSocket} = props;
    console.log(currentUser);
    
    if(currentUser && !socket){
        
        const socketInst =  io('localhost:5000/'); //! ~localhost:5000/chat later
        var room;
        if(currentUser._id) room = currentUser._id.toString();
        socketInst.on('connect', () => socketInst.emit('privateRoom', room));
        // ? socketInst.emit('iAmOnline', currentUser)

        // socketInst.on('newRoom', (newRoom) => newChatRoom(newRoom));
        
        saveSocket(socketInst);
     
    }
    

    const authorizedRoute = (Component,routeName) => {
        return(
            <Route
                path={`/:username/${routeName}`}
                exact
                render={(propers) => {
                        const address = propers.location.pathname;
                        const { match: { params } } = propers;
                        if(currentUser && params.username===currentUser.username){
                            return <Component {...propers}/>;
                        } else{
                            return history.push('/signin', {address, username:params.username});
                        }                        
                    }                        
                }
            />
        );
    }; 

    return (
        <div className="ui container">
            <Router history={history}>
                
                <Route path="/" exact component={Landing} />
                
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
                

                {/* {authorizedRoute(Profile,'profile')} */}
                
                <Route
                    path={`/profile/:username`}
                    exact
                    render={(props) => {                                               
                            if(!_.isEmpty(currentUser)) return <Profile {...props} />;
                            else return history.push('/signin');                            
                        }                        
                    }
                />

                {authorizedRoute(Home,'home')}

                {authorizedRoute(Post,'createpost')}

                {authorizedRoute(Post,'updatepost')}

                {authorizedRoute(Chat,'chat')}

                {authorizedRoute(ChatList,'allChats')}


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

