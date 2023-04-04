const sql = require('mssql');
const config = require('./configFile');
async function updateProduct(product, imageSource){
  const pool = await sql.connect(config);
  try{
    if(imageSource){
        await pool.request().query(`UPDATE productsTable SET name = '${product.name}',displayName = '${product.displayName}',imageSource = '${imageSource}',price = ${product.price}, color = '${product.color}', description = '${product.description}', sellerID = 1, availableStocks = ${product.quantity} WHERE productID = ${product.pid}`);
    } else {
        await pool.request().query(`UPDATE productsTable SET name = '${product.name}',displayName = '${product.displayName}',price = ${product.price}, color = '${product.color}', description = '${product.description}', sellerID = 1, availableStocks = ${product.quantity} WHERE productID = ${product.pid}`);
    }
    await pool.close();
    return true;
  }catch(err){
    console.log(err.message);
    await pool.close();
    return false;
  }
}
module.exports = updateProduct;;