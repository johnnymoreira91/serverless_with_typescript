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
  const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!body.name) {
    return {
      error: true,
      message: 'name is required'
    }
  }

  if (!body.email) {
    return {
      error: true,
      message: 'email is required'
    }
  }

  if (!emailReg.test(body.email)) {
    return {
      error: true,
      message: 'email is not valid'
    }
  }

  if (!body.password) {
    return {
      error: true,
      message: 'password is required'
    }
  }

  if (!passwordReg.test(body.password)) {
    return {
      error: true,
      message: 'password should contains at least one upper char, one lower char, one digit and 8 characters'
    }
  }

  if (!body.permissionLevel) {
    // return {
    //   error: true,
    //   message: 'permissionLevel is required'
    // }
    body.permissionLevel = 0
  }

  if (!body.rg) {
    body.rg === 'undefined'
  }

  if (!body.cpf) {
    body.cpf === 'undefined'
  }

  if (!body.sexo) {
    body.sexo === 'undefined'
  }

  if (!body.active) {
    body.active === true
  }

  if (!body.superUser) {
    body.superUser === false
  }

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
        ?,?,?,?,?,?,?,?,?,?
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