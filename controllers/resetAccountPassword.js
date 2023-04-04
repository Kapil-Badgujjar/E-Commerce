const changePassword = require('../services/changePassword');
let resetToken=undefined;
async function activatePasswordReset(token){
    resetToken = token;
    setTimeout(() =>{
        resetToken=undefined;
    },60000);
    return await changePassword.activateChangeRequest(token);
};
async function resetAccountPassword(obj){
    let flag =  await changePassword.changePassword(obj.password,resetToken);
    resetToken = undefined;
    return flag;

}
module.exports = {activatePasswordReset, resetAccountPassword };