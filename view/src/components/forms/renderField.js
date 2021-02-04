import React from 'react'

export const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} autoComplete="off" />
      {touched && error && <span>{error}</span>}
      {/* //! in last && just put the intended component  */}
    </div>
  </div>
);

export const textInput = ({ input, type, placeholder }) => (
  <div>
    <input {...input} placeholder={placeholder} type={type} autoComplete="off" />      
  </div>
);


