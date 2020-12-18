// import users from "../../../../view/src/apis/users";

const onlineUsers = [];

// new user comes online
const userComesOnline = (newUser) => {
    onlineUsers.push(newUser);
    return onlineUsers;
};

const fetchOnlineUsers = () => {
    return onlineUsers;
}

module.exports = {
    userComesOnline,
    fetchOnlineUsers
};

