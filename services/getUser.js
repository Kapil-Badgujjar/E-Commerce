const sql = require('mssql');
const config = require('./configFile');
async function getUser(email,password){
  const pool = await sql.connect(config);
  const result = await pool.request().query(`SELECT * FROM AuthenticationTable WHERE emailID = '${email}' AND password = '${password}'`);
  await pool.close();
  return result.recordset;
}
module.exports = getUser;