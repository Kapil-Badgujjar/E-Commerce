const express = require('express');
const session = require('express-session');
const login = require('./routes/login');
const signup = require('./routes/signup');
const user = require('./routes/user');
const cart = require('./routes/cart');
const reset = require('./routes/resetPassword');
const product = require('./routes/products');
const fetchProducts = require('./controllers/fetchProducts');
const app = express();

const port = 3000;

app.set('view engine','ejs');

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    isLoggedIn: false,
    adminLogin: false
}));
app.use(express.static('public'));
app.use(express.static('resources/productsImages'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/login',login);
app.use('/signup',signup);
app.use('/user',user);
app.use('/reset',reset);
app.use('/cart',cart);
app.use('/product',product);

app.listen(port,()=>{
    console.log('Server started ... \nhttp://localhost:3000');

});

app.get('/setInitialValues',(req,res)=>{
    fetchProducts.setCounter();
    res.json("done");
});
app.get('/getData',async (req,res)=>{
    let products = await fetchProducts.getProducts();
    if(products.length==5) {res.statusCode=200; res.json(products);}
    else if(products.length>0) {res.statusCode=401; res.json(products);}
    else{ res.statusCode=404; res.end(console.log('No more products found!')); }
});
app.get('/getAllProducts',async (req,res)=>{
    let products = await fetchProducts.getAllProducts();
    if(products.length==5) {res.statusCode=200; res.json(products);}
    else if(products.length>0) {res.statusCode=401; res.json(products);}
    else{ res.statusCode=404; res.end(console.log('No more products found!')); }
});
app.get('/',(req,res)=>{
    if(req.session.isLoggedIn){
        res.redirect('/user');
    }else{
        res.render('index',{msg: undefined});
    }
});
app.get('/admin',(req,res)=>{
    if(req.session.adminLogin&&!req.session.isLoggedIn){
        res.render('adminpage',{active: false, errormsg:'', status:1, msg:5});
    }else{
        res.redirect('/login');
    }
    
});
app.get('*',(req,res)=>{
    res.render('404page.ejs');
})