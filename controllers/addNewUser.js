const customQuery = require('../services/customQuery');
async function addNewUser(obj){
    let fileData = await customQuery(`SELECT * FROM AuthenticationTable where emailID = '${obj.email}'`);
    if(fileData.length==1) return false;
    try{
        await customQuery(`INSERT INTO AuthenticationTable(userName,emailID,password,isVerified,passwordResetRequest,mailToken,role) values('${obj.username}','${obj.email}','${obj.password}',0,0,'${obj.mailToken}','User')`);
        return true;
    }catch(err){
        console.log(err.message);
    }
    return false;
}
module.exports = addNewUser;