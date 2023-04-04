require('dotenv').config();
const express = require('express');
const router = express.Router();
const verifyUser = require('../controllers/verifyUser');
const checkSession = require('../middlewares/checkSession');

router.route('/').get(checkSession,(req,res)=>{
    res.render('login');
}).post(async (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    if(email == process.env.ADMIN_ID && password == process.env.ADMIN_PASSWORD){
        req.session.isLoggedIn=false;
        req.session.adminLogin=true;
        res.statusCode = 300;
        res.end('');
    }else{
        let route = await verifyUser(req.session,email, password);
        if(route==1){
            req.session.adminLogin=false;
            req.session.isLoggedIn=true;
            res.statusCode = 200;
            res.redirect('/user');
        }else if(route==0){
            res.statusCode = 401;
            res.end('');
        }else{
            res.statusCode = 404;
            res.end('');
        }
    }
});
module.exports = router;