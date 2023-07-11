// import React, { useState } from 'react'
// import { Dropdown } from 'semantic-ui-react'


// // const sampleOptions = [
// //   { key: '', text: '', value: '' }
// // ]
// // [
// //   { key: '1', text: '1', value: '1' },
// //   { key: '2', text: '2', value: '2' }
// // ]
// const DropdownInput = (props) => {
  
//   const [options, setOptions] = useState([
//     { key: '1', text: '1', value: '1' },
//     { key: '2', text: '2', value: '2' }
//   ]);
//   const [currentValue, setCurrentValue] = useState('');

//   // const toTitleCase = (value) => {
//   //   if(!value) return value;
//   //   return value.replace(
//   //     /\w\S*/g,
//   //     (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()      
//   //   );
//   // }
  
//   // if(options.length===0) setOptions(sampleOptions);

//   const handleAddition = (e, { value }) => {
//     setOptions((old) =>  [{ text: value, value }, ...old]);
//   }

//   const handleChange = (value) => {
//     console.log(value);
//     // setCurrentValue(value);
//     // let newValue = toTitleCase(value);
//     setCurrentValue(value);
//     props.input.onChange(value);
//   }

//   return (
//     <Dropdown
//       options={options}
//       placeholder={props.placeholder}
//       search
//       selection
//       fluid
//       allowAdditions
//       additionLabel=""
//       value={props.input.value}
//       onAddItem={handleAddition}
//       onChange={(e, { value }) => handleChange(value)}
//     />
//   )
  
// }

// export default DropdownInput;

import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'

// const searchOptions = [
//   {
//     key: 'Alumni',
//     text: 'Alumni',
//     value: 'Alumni',
    
//   },
//   {
//     key: 'Intern',
//     text: 'Intern',
//     value: 'Intern',
//   }
// ]

const DropdownInput = (props) => {
  // console.log(props);
  const { input, placeholder, meta: { touched, error } } = props;
  const [options, setOptions] = useState([
    {
      key: 'Alumni',
      text: 'Alumni',
      value: 'Alumni',
      
    },
    {
      key: 'Intern',
      text: 'Intern',
      value: 'Intern',
    }
  ]);
  const [currentValue, setCurrentValue] = useState('');
  const handleAddition = (e, { value }) => {
    setOptions((old) =>  [{ text: value, value }, ...old]);
  }

  const normalize = (value) => value.replace(
    /\w\S*/g,
    (txt) => {
        let result = txt.charAt(0).toUpperCase() + txt.substr(1);
        result =  result.replace("Of", "of");
        return result;
    }
  );
  return (
    <div className={`field ${error && touched ? 'error':''}`}>
      <label>{ placeholder} {touched && error && <span className="ui red horizontal label"> {error} </span>} </label>
      <Dropdown
        {...input}
        options={options}
        placeholder={placeholder}
        search
        fluid
        selection
        allowAdditions
        additionLabel=""
        // value={input.value}
        onAddItem={handleAddition}
        // onChange={(param, data) => {
        //   // let newValue = normalize(data.value)
        //   // console.log(data.value);
        //   // setCurrentValue(data.value);
        //   input.onChange(data.value);
        // }}
      />
    </div>
  );
}
export default DropdownInput;