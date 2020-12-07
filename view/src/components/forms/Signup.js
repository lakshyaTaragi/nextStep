import React, { Component } from 'react';
import PropTypes from 'prop-types'; //! Learn about these

import FirstPage from './FirstPage';
import SecondPage from './SecondPage';

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            page:1,
        }        
    }
    
    nextPage = () => {
        this.setState({page: this.state.page + 1});
    }

    previousPage = () => {
        this.setState({page: this.state.page - 1});        
    }

    render(){
        // ! Deal with this onSubmit and also isMentor(initialize with false to avoid errors) prop
        const {onSubmit} = this.props;
        const {page} = this.state;
        return (
            <div>
                {/* //! onSubmit called --> change page number in state */}
                {page===1 && <FirstPage onSubmit={this.nextPage} />}
                {page===2 && <SecondPage previousPage={this.previousPage} onSubmit={onSubmit} isMentor={this.props.isMentor}/>}
            </div>
        );
    }
};

Signup.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isMentor: PropTypes.bool.isRequired
};

export default Signup;