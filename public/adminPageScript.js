let addProductBtn = document.getElementById('addProduct');
let editProductBtn = document.getElementById('editProduct'); 
let logoutBtn = document.getElementById('logout');

addProductBtn.addEventListener('click', function(){
    document.getElementById('errormsg').style.display='none';
    document.getElementById('edit-product-div').style.display = "none";
    document.getElementById('edit-form').style.display = "none";
    document.getElementById('add-product-form').style.display = "flex";
});

editProductBtn.addEventListener('click', function(){
    document.getElementById('errormsg').style.display='none';
    document.getElementById('edit-form').style.display = "none";
    document.getElementById('add-product-form').style.display = "none";
    document.getElementById('edit-product-div').style.display = "grid";
});
logoutBtn.addEventListener('click', function(){
    console.log('Hello');
        window.location.href='/user/logout';
});


