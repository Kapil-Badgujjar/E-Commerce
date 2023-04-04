const sql = require('mssql');
const config = require('./configFile');
async function deleteProduct(productID){
  const pool = await sql.connect(config);
  const transaction =new sql.Transaction(pool);
  try{
    transaction.begin();
    await pool.request().query(`DELETE productsTable WHERE productID = ${productID}`);
    await pool.request().query(`DELETE usersCartsTable WHERE productID = ${productID}`);
    transaction.commit();
    await pool.close();
    return true;
  }catch(err){
    console.log(err.message);
    transaction.rollback();
    await pool.close();
    return false;
  }
}
module.exports = deleteProduct;