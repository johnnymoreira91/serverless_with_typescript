import Sql from "@database/mysql";

export default async function listUsers() {
  (await Sql()).connect()
  const [rows] = await (await Sql()).query(`
    SELECT * FROM users
  `)
  console.log(rows)
  return rows
}