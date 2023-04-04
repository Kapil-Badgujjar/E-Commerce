// const fileReader = require('../services/fileReaders/fileReader');
// const fileWriter = require('../services/fileWriters/fileWriter');
const cartFunctions = require('../services/cartFunctions');

async function addUpdateItems(userID,productID) {
    return await cartFunctions.addProductToUserCart(userID, productID);
    // let fileData = JSON.parse(fileReader('/usersCartData/usersCartData.json','utf-8'));
    // let productFileData = JSON.parse(fileReader('/productsData/products.json','utf-8'));

    // for(let i = 0; i<fileData.length; i++){
    //     if(fileData[i].userID == email){
    //         for(let j = 0; j < fileData[i].items.length; j++){
    //             if(fileData[i].items[j].id==productId){
    //                 fileData[i].items[j].quantity+=1;
    //                 fileWriter('/usersCartData/usersCartData.json',fileData);
    //                 return true;
    //             }
    //         }
    //         for(let k=0; k<productFileData.length; k++){
    //             if(productFileData[k].id==productId){
    //                 productFileData[k].quantity=1;
    //                 fileData[i].items.push(productFileData[k]);
    //                 fileWriter('/usersCartData/usersCartData.json',fileData);
    //                 return true;
    //             }
    //         }
    //     }
    // }
    // let newProduct = undefined;
    // for(let k=0; k<productFileData.length; k++){
    //     if(productFileData[k].id==productId){
    //         productFileData[k].quantity=1;
    //         newProduct = productFileData[k];

    //     }
    // }
    // let tempObj = { userID: email, items:[]};
    // tempObj.items.push(newProduct);
    // fileData.push(tempObj);
    // fileWriter('/usersCartData/usersCartData.json',fileData);
    // return true;
}

async function updateQuantity(userID,productID,flag){
    return await cartFunctions.updateQuantity(userID,productID,flag);

//     let fileData = JSON.parse(fileReader('/usersCartData/usersCartData.json','utf-8'));
//     for(let i = 0; i<fileData.length; i++){
//         if(fileData[i].userID == email){
//             for(let j = 0; j < fileData[i].items.length; j++){
//                 if(fileData[i].items[j].id==productId){
//                     if(flag)
//                         fileData[i].items[j].quantity+=1;
//                     else{
//                         fileData[i].items[j].quantity-=1;
//                         if(fileData[i].items[j].quantity<1){
//                             removeProduct(email, productId)
//                             return true;
//                         }
//                     }
//                     fileWriter('/usersCartData/usersCartData.json',fileData);
//                     return true;
//                 }
//             }
//         }
//     }
//     return false;
}

async function removeProduct(userID, productID){
    return await cartFunctions.removeProduct(userID, productID);
    // let fileData = JSON.parse(fileReader('/usersCartData/usersCartData.json','utf-8'));
    // for(let i = 0; i<fileData.length; i++){
    //     let index=-1;
    //     if(fileData[i].userID == email){
    //         for(let j = 0; j < fileData[i].items.length; j++){
    //             if(fileData[i].items[j].id==productId){
    //                 index=j;
    //                 fileData[i].items.splice(j, 1);
    //                 if(fileData[i].items.length==0){
    //                     fileData.splice(i, 1);
    //                 }
    //                 fileWriter('/usersCartData/usersCartData.json',fileData);
    //                 return true;
    //             }
    //         }
    //     }
    // }
    // return false;
}
module.exports = {addUpdateItems, updateQuantity, removeProduct};