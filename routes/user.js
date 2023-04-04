const express = require('express');
const router = express.Router();

const verifyEmail = require('../controllers/verifyEmail');
const checkSession = require('../middlewares/checkSession');
const updatePassword = require('../services/changePassword').updatePassword;

router.get('/',(req,res)=>{
    if(req.session.isLoggedIn){
        res.render('user',{status:0, msg:req.session.userName});
    }
    else{
        res.redirect('/login');
    }
});

router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
});

router.get('/verifyEmail/:token', async (req,res)=>{
    const { token } = req.params;
    if(await verifyEmail(token)){
        res.redirect('/login');
    }else{
        res.end('');
    }
});
////
router.route('/updatePassword').get(checkSession,(req,res)=>{
    res.render('updatePassword');
}).post(async (req,res)=>{
    let flag = await updatePassword(req.session.userID,req.body.newPassword);
    if(flag){
        res.statusCode = 200;
        res.end('');
    }else{
        res.statusCode = 403;
        res.end('');
    }
});

module.exports = router;
