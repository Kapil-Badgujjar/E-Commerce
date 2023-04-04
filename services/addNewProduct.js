const sql = require('mssql');
const config = require('./configFile');
async function addNewProduct(product, imageSource){
  const pool = await sql.connect(config);
  try{
    await pool.request().query(`INSERT INTO productsTable(name,displayName,imageSource,price, color, description, sellerID, availableStocks) VALUES('${product.name}','${product.displayName}','${imageSource}',${product.price},'${product.color}','${product.description}',1,${product.quantity})`);
    await pool.close();
    return true;
  }catch(err){
    console.log(err.message);
    await pool.close();
    return false;
  }
}
module.exports = addNewProduct;;