export const validate = formValues => {
    const errors = {};  
    
    if (!formValues.username) {errors.username = 'Required'};
    if(formValues.username && formValues.username.split(" ").length>1)  {errors.username = 'Invalid username. Must be a single word'}; 

    if (!formValues.firstName) {errors.firstName = 'Required'}
    if (!formValues.lastName) {errors.lastName = 'Required'}

    if (!formValues.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
        errors.email = 'Invalid email address'
    }

    if (!formValues.password) {
        errors.password = 'Required'
    } else if (formValues.password.length < 5) {
        errors.password = 'Password must be atleast 5 characters long'
    } else if(formValues.password2 && formValues.password !== formValues.password2){
        errors.password2 = 'Passwords do not match' 
    }

    if (!formValues.hometown) {errors.hometown = 'Required'}
    
    if (!formValues.school) {errors.school = 'Required'}
    if (!formValues.schoolCity) {errors.schoolCity = 'Required'}
    
    if (!formValues.college) {errors.college = 'Required'};

    return errors;
};
