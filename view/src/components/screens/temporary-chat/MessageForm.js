import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { textInput } from '../../forms/renderField';
import { sendChat } from '../../../actions';

const MessageForm = (props) => {

    const { handleSubmit, pristine, reset, submitting, sendChat, receiverId, currentUser, socket } = props;


    const onSubmit = formValues => {
        sendChat(formValues, currentUser._id, receiverId, socket)
        .then(() => reset());
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <Field
                name="message"
                type="text"
                component={textInput}
                placeholder="Message..."
            />
            <div>
                <button className="btn btn-primary" type="submit" disabled={pristine || submitting}>
                    Send
                </button>
            </div>
        </form>
    );

}; 

const formWrapped = reduxForm({
    form: 'message'
})(MessageForm);

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
        socket: state.auth.socket
    };
}

export default connect(mapStateToProps, {
    sendChat
})(formWrapped);