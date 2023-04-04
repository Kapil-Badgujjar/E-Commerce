const express = require('express');
const router = express.Router();
const checkSession = require('../middlewares/checkSession');

const addNewUser = require('../controllers/addNewUser');
const sendMail = require('../methods/emailVerify');

router.route('/').get(checkSession,(req,res)=>{
    res.render('signup');
})
.post( async (req,res)=>{
    let obj = req.body;
    obj.mailToken = Date.now();
    if(await addNewUser(obj)){
        sendMail(obj.email,obj.mailToken);
        res.redirect('/login');
    }else{
        res.statusCode = 305;
        res.end('');
    }
});

module.exports = router;