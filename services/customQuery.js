const sql = require('mssql');
const config = require('./configFile');
async function customQuery(query){
  const pool = await sql.connect(config);
  const result = await pool.request().query(query);
  await pool.close();
  return result.recordset;
}
module.exports = customQuery;