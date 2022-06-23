import { createConnection } from 'mysql2/promise'
import bluebird from 'bluebird'

export default async function Sql() {
  const connection = await createConnection(
    {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: 3306,
      Promise: bluebird
    }
  );

  let [rows] = await connection.query('SELECT * FROM users',' dento do testeeeeeeeeeeeee')
  console.log(rows)

  return connection
}