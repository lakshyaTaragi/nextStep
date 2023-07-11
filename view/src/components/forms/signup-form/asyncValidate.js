import users from '../../../apis/users';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const asyncValidate = ({username, email}) => {

    return sleep(500).then(async () => {
        if(username!==''){
            const response = await users.get(`/check/${username}/username`);
            if(response.data){
                throw {username: 'This username is taken'}
            }
        }
        if(email!==''){
            const response = await users.get(`/check/${email}/email`);
            if(response.data){
                throw {email: 'This email is already registered.'}
            }
        }
    });  
}

