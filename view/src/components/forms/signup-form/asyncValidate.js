import users from '../../../apis/users';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const asyncValidate = ({username}) => {
    return sleep(1000).then(async () => {
        if(username!==''){
            const response = await users.get(`/check/${username}`);
            if(response.data){
                throw {username: 'This username is taken'}
            }
        }
    });  
}

