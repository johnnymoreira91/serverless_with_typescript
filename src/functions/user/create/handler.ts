import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: number;
  uuid: string;
  name: string;
  email: string;
  password: string;
  permissionLevel: number
}

const createUser: ValidatedEventAPIGatewayProxyEvent<User> = async (event) => {
  const data = JSON.stringify(event.body);
  const body = JSON.parse(data)
  const {name, email, password, permissionLevel} = body
  console.log(body.name)
  try {
    const user = {
      id: uuidv4(),
      name,
      email,
      password,
      permissionLevel
    }
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
