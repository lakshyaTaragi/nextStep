import React, { useEffect, useState } from 'react'; 
import { Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Label, Icon } from 'semantic-ui-react'

import { renderField } from './renderField';

// ! based on formAction prop --> create for now
import {createPost, updatePost, loadPostValues} from '../../actions';
import _ from 'lodash';

const Post = (props) => {
    let history = useHistory();

    const [isQuestion, setIsQuestion] = useState(false);
    const [tags, setTags] = useState([]);

    // console.log(props);
    
    const { currentUser, 
        location: {formAction},
        createPost, updatePost, loadPostValues, 
        handleSubmit, submitting, pristine
    } = props;


    
    useEffect(()=>{
        if(formAction==="update") {
            setTags(props.location.postValues.tags);
            loadPostValues(props.location.postValues);
        }
        else loadPostValues({title:'', content:''});
    },[]);

    
    const onSubmit = formValues => {
        formValues = {...formValues, isQuestion, tags};

        if(formAction==="create"){

            createPost(formValues, currentUser._id, currentUser.username)
            .then(()=>history.push(`/profile/${currentUser.username}`));

        } else if(formAction==="update"){

            updatePost(formValues, props.location.postValues._id, currentUser.username)
            .then(()=>history.push(`/profile/${currentUser.username}`));

        } 
    };

    const addTag = e => {
        e.preventDefault();
        let tmp = e.target.value;
        if(tmp!=="" && !_.includes(tags, tmp)){
            setTags(tags => [...tags, tmp]);
        }
        e.target.value = "";
    }

    const renderTags = tags => {
        return _.map(tags, tag => (
            <Label key={tag.toString()} color='teal' >
                {tag}
                <Icon 
                    name='delete' 
                    onClick={() => setTags(_.without(tags, tag))}
                />
            </Label>)
        );
    }

    return (
        <div className="ui container  segment">

            <div className="ui form">

                <h3 className="ui block header">
                    {formAction==="update" ? "Update" : "New"} Post     <i className="keyboard outline icon"/>
                </h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <Field
                        name="title"
                        type="text"
                        component={renderField}
                        placeholder="Title"
                    />

                    <Field
                        name="content"
                        type="textarea"
                        component={renderField}
                        placeholder="Content"
                    />
                    
                    <div className="inline field">
                        <div className="ui checkbox">
                            <input type="checkbox" tabIndex="0" onClick={() => setIsQuestion(!isQuestion)} />
                            <label>Is this a question?</label>
                        </div>
                    </div>   


                    <h4 className="ui dividing header">Add Tags</h4>
                    {/* //! allowAdditions can be used with multiple. */}

                    <div className="inline field ui right labeled left icon input">
                        <i className="tags icon"/>
                        <input 
                            type="text" 
                            placeholder="Keywords or Phrases"  
                            onKeyPress={(e) => {
                                e.key==='Enter' && addTag(e);
                                // e.key==='Enter' && e.preventDefault();
                                // e.key==='Enter' && console.log(e.target.value);
                                // console.log(e.target.value);
                            }}
                        />
                        <a className="ui tag label"/>
                    </div>    

                    <div>
                        <Label.Group size='medium'>
                        {renderTags(tags)}
                        </Label.Group>
                    </div>          
                    

                    <div>
                        <button type="submit" className={`ui right labeled ${pristine && submitting ? 'disabled':''} icon primary button`} >
                            {formAction==="update" ? "Update" : "Post"} <i className="file icon"/>
                        </button>
                    </div>
                </form>
            
            </div>
        </div>
        
    );
};

const validate = formValues => {
    const errors = {};
    if(!formValues.title) errors.title = 'Cannot be blank';
    if(!formValues.content) errors.content = 'Cannot be blank';
    return errors;
};


const formWrapped = reduxForm({
    form: 'post',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    enableReinitialize : true,
    validate
})(Post);

const mapStateToProps = (state) => {
    return {
        currentUser:state.auth.currentUser,
        initialValues: state.post.postValues
    };
};

export default connect(mapStateToProps, {
    createPost,
    updatePost,
    loadPostValues
})(formWrapped);