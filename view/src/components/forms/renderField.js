import React from 'react'
import DropdownInput from '../DropdownInput';

export const renderField = ({ input, placeholder, type, meta: { touched, error } }) => (
    <div className={`field ${error && touched ? 'error':''}`}>
      <label>{ placeholder} {touched && error && <span className="ui red horizontal label"> {error} </span>} </label>
        <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
        {/* //! in last && just put the intended component  */}
    </div>
);

export const textInput = ({ input, type, placeholder }) => (
  <div>
    <input {...input} placeholder={placeholder} type={type} autoComplete="off" />      
  </div>
);

export const dropDownInput = (props) => {
  const { input, placeholder, meta: { touched, error } } = props;
  return (
    <div className={`field ${error && touched ? 'error':''}`}>
      <label>{ placeholder} {touched && error && <span className="ui red horizontal label"> {error} </span>} </label>
        <DropdownInput input={input} placeholder={placeholder}/>
    </div>
  );
}

// export const fileUploadInput = () => (
//   <form encType="multipart/form-data">
//     <input type="file" accept=".jpg, .png, .jpeg" change="fileEvent($event)" className="inputfile" />  
//   </form>
    
// );
