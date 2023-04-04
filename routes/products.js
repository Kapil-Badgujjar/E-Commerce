const express = require('express');
const app = express();
const router = express.Router();
const multer = require('multer');
const bodyParser = require('body-parser');
const addNewProduct = require('../services/addNewProduct');
const loadProducts = require('../services/loadProducts');
const updateProduct = require('../services/updateProduct');
const deleteProduct = require('../services/deleteProduct');

app.use(bodyParser.urlencoded({extended: true}));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
         cb(null,'resources/productsImages');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage: storage});

router.route('/add-product').post(upload.single('image'),async (req,res)=>{
    let product = req.body;
    if(product.name == undefined||product.displayName == undefined||product.price == undefined||product.color == undefined||product.description == undefined||product.quantity == undefined|| req.file == undefined){
        res.render('adminpage',{active:true, errormsg:'Please enter proper values!', status: 1, msg: 5});
    }else{
        await addNewProduct(product,req.file.filename);
        res.redirect('/admin');
    }
});

router.route('/edit-product').post(async(req,res)=>{
    let productID = req.body.productID;
    let product = await loadProducts(false,undefined,productID);
    res.json(product);
});

router.route('/update-product').post(upload.single('image'),async (req,res)=>{
    let product = req.body;
    let flag;
    if(req.file!=undefined) flag = await updateProduct(req.body,req.file.filename);
    else {
        // if(product.name == undefined||product.displayName == undefined||product.price == undefined||product.color == undefined||product.description == undefined||product.quantity == undefined){
        //     res.render('adminpage',{active:true, errormsg:'Please enter proper values!', status: 1, msg: 5});
        //     return;
        // }else
            flag = await updateProduct(product,undefined);
    }
    if(flag){
        res.statusCode = 200;
        res.redirect('/admin');
    } else {
        res.statusCode = 404;
        // res.redirect('/admin');
        res.render('adminpage',{active: true, errormsg:'Updation Failed!', status:1, msg:5});
    }
});

router.route('/delete-product').post(async(req,res)=>{
    let flag = await deleteProduct(req.body.productID);
    if(flag){
        res.statusCode = 200;
        res.redirect('/admin');
    }
    else{
        res.statusCode = 404;
        // res.redirect('/admin');
        res.render('adminpage',{active: true, errormsg:'Deletion failed Failed!', status:1, msg:5});
    }
});
module.exports = router;