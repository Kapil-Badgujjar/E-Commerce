const customQuery = require('../services/customQuery');
async function forgotPassword(email){
    let user = await customQuery(`SELECT * FROM AuthenticationTable WHERE emailID = '${email}'`);
    if(user.length==1){
        return { choice: true, token: user[0].mailToken };
    }
    return { choice: false, token: undefined };
}
module.exports = forgotPassword;