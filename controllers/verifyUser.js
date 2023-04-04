const getUsers = require('../services/getUser');
async function verifyUser(session,email,password){
    try{
        users = await getUsers(email,password);
        if(users.length==1){
            if(users[0].isVerified)
            { 
                session.userID=users[0].userID;
                session.userName=users[0].userName; 
                return 1;
            }else{ 
                return 0;
            }
        }
    }catch(e){
        console.log(e.message);
    }
    return -1;
}
module.exports = verifyUser;