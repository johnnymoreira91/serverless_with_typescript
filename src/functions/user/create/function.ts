import Sql from "@database/mysql"
import { v4 as uuidv4 } from 'uuid'

export interface CreateUserInterface {
  id?: number,
  userId?: string,
  name: string,
  email: string,
  password: string,
  permissionLevel: number,
  rg?: string,
  cpf?: string,
  sexo?: string,
  active: boolean,
  superUser: boolean
}

export default async function createNewUser(body: CreateUserInterface) {
  (await Sql()).connect()
  const [rows] = await (await Sql()).query(`
    INSERT INTO users
      (
        userId,
        name,
        email,
        password,
        permissionLevel,
        rg,
        cpf,
        sexo,
        active,
        superUser
      )
      VALUES
      (
        ?,?,?,?,?,?,?,?,?
      )
  `,
    [
      uuidv4(),
      body.name,
      body.email,
      body.password,
      body.permissionLevel,
      body.rg,
      body.cpf,
      body.sexo,
      body.active,
      body.superUser
    ]
  )
  await (await Sql()).end()
  return rows
}