const cartFunctions = require('../services/cartFunctions');
async function getUserCart(userID) {
    let cartItems = await cartFunctions.loadUserCart(userID);
    if(cartItems.length > 0)
    return { flag: true, cartData: cartItems};
    return {flag:false, cartData:undefined};
}
module.exports = getUserCart;