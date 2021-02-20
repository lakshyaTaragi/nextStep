import React from 'react'

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

// export const fileUploadInput = () => (
//   <form encType="multipart/form-data">
//     <input type="file" accept=".jpg, .png, .jpeg" change="fileEvent($event)" className="inputfile" />  
//   </form>
    
// );
