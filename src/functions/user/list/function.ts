import Sql from "@database/mysql";
import {setCache, getCache} from '@services/Cache'

export default async function listUsers() {
try {
  const dataCached = await (await getCache('allUsers'))
  if (!dataCached) {
    (await Sql()).connect()
    const [rows] = await (await Sql()).query(`
      SELECT * FROM users
    `)
    await setCache('allUsers', rows)
    return rows
  }
  return dataCached
} catch (error) {
  return error
}
}