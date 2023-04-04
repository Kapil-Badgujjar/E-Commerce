const express = require('express');
const checkSession = require('../middlewares/checkSession');
const router = express.Router();

const passwordResetEmail = require('../methods/passwordResetEmail');
const resetPassword = require('../controllers/resetAccountPassword');
const forgotPassword = require('../controllers/forgotPassword');

router.get('/activatePasswordReset/:token',async (req,res)=>{
    const { token } = req.params;
    if(await resetPassword.activatePasswordReset(token)){
        res.redirect('/reset/resetPassword');
    }else{
        res.end('');
    }
});

router.route('/forgotPassword')
.get(checkSession,(req,res)=>{
    res.render('forgotPassword');
})
.post(async (req,res)=>{
    let status = await forgotPassword(req.body.email);
    if(status.choice){
        passwordResetEmail(req.body.email,status.token);
        res.statusCode=200;
        res.end('');
    }else{
        res.statusCode=404;
        res.end('');
    }
});

router.route('/resetPassword').get(checkSession,(req,res)=>{
    res.render('resetPassword');
})
.post(async (req,res)=>{
    if(await resetPassword.resetAccountPassword(req.body)){
        res.statusCode = 200;
        res.redirect('/login');
    }
    else{
        res.statusCode = 404;
        res.end('');
    }
});

module.exports = router;