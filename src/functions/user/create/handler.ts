import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import createNewUser, { CreateUserInterface } from './function'

const createUser: ValidatedEventAPIGatewayProxyEvent<CreateUserInterface> = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const data = JSON.stringify(event.body);
  const body: CreateUserInterface = JSON.parse(data)
  const { name, email, password, permissionLevel, active, superUser, cpf, rg, sexo } = body
  console.log(body)
  try {
    const user = await createNewUser({
      name: name,
      password: password,
      email: email,
      permissionLevel: permissionLevel,
      active: active || true,
      superUser: superUser || false,
      cpf: cpf,
      rg: rg,
      sexo: sexo
    })
    return {
      statusCode: 201,
      body: JSON.stringify({
        user
      }),
    };
  } catch (error) {
    console.log(error)
    return formatJSONResponse({
      errorCode: error.code,
      error_on: error.meta.target
    });
  }
};

export const main = middyfy(createUser);
