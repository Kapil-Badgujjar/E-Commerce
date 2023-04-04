const express = require('express');
const router = express.Router();

const updateCart = require('../controllers/updateCart');
const getUserCart = require('../controllers/getUserCart');

router.route('/openCart').get((req,res)=>{
    if(req.session.isLoggedIn==undefined) res.redirect('/login');
    else res.render('userCart',{status:0 ,msg: req.session.userName});
});
router.get('/getUserCart', async (req,res)=>{
    let cartItems = await getUserCart(req.session.userID);
    if(cartItems.flag)
    {   
        res.statusCode = 200;
        res.json(cartItems.cartData);
    }
    else {
        res.statusCode = 404;
        res.json([]);
    }
});
router.route('/addToUserCart').post(async (req, res) => {
    if(req.session.isLoggedIn){
        let flag = await updateCart.addUpdateItems(req.session.userID,req.body.productID);
        if(flag){
            res.statusCode = 200;
            res.end('');
        }
        else{
            res.statusCode = 404;
            res.end('');
        }
    }
    else{
        res.statusCode = 404;
        res.end('');
    }
});
router.route('/updateCart').post(async (req,res)=>{
    if(req.session.isLoggedIn){
        let localFlag = await updateCart.updateQuantity(req.session.userID,req.body.productID,req.body.flag);
        if(localFlag){
            res.statusCode = 200;
            res.end('success');
        } else {
            res.statusCode = 404;
            res.end('success');
        }
    } else {
        res.statusCode = 404;
        res.end('success');
    }

});
router.post('/removeProduct',async (req, res) => {
    if(req.session.isLoggedIn){
        let localFlag = await updateCart.removeProduct(req.session.userID,req.body.productID);
        if(localFlag){
            res.statusCode = 200;
            res.end('');
        } else {
            res.statusCode = 404;
            res.end('');
        }
    } else {
        res.statusCode = 404;
        res.end('');
    }
});

module.exports = router;