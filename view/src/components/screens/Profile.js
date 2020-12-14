import React from 'react';
import { connect } from 'react-redux';

import { signOut } from '../../actions';

const Profile = (props) => {
    return (
        <div>
            Profile component
            <br/>
            {props.message}
            <br/>
            <button type="button" onClick={props.signOut}>
                Logout
            </button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {message: state.auth.message};
}

export default connect(mapStateToProps,{
    signOut
})(Profile);
