// import { useState, useEffect } from 'react';
// import users from '../../../apis/users';

// const DebouncedSearch = (props) => {
//     const [debouncedTerm, setDebouncedTerm] = useState('');
//     console.log("decounced search");
    
//     var {formValues, errors} = props;

//     useEffect(() => {
//         const timerId = setTimeout(() => {
//             setDebouncedTerm(formValues.username);
//         }, 1000);
//         return () => {
//             clearTimeout(timerId);
//         };
//     },[formValues.username]);

//     useEffect(() => {
//         const search = async () => {
//             const res = await users.get(`/check/${debouncedTerm}`);
//             if(res.data) errors.username = 'Username already taken';
//         }
//         search();
//     }, [debouncedTerm]);
// }

// export default DebouncedSearch;