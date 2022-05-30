import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Prisma, User } from '@prisma/client';
import prisma from '@database/index'

// import schema from './schema';

const createUser: ValidatedEventAPIGatewayProxyEvent<User> = async (event) => {
  const data = JSON.stringify(event.body);
  const body = JSON.parse(data)
  const {name, email, password, permissionLevel} = body
  console.log(body.name)
  try {
    const users = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        permissionLevel: permissionLevel || 0
      }
    })
    return {
      statusCode: 201,
      body: JSON.stringify({
        users
      }),
    };
    // return formatJSONResponse({
    //   statusCode: 200,
    //   message: `Hello ${event.body.name}, your email is ${event.body.email}`
    // });
  } catch (error) {
    console.log(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === 'P2002') {
        let message = 'There is a unique constraint violation, a new user cannot be created with this email'
        return {
          statusCode: 409,
          body: JSON.stringify('There is a unique constraint violation, a new user cannot be created with this email')
        }
      }
    }
    return formatJSONResponse({
      errorCode: error.code,
      error_on: error.meta.target
    });
  }
};

export const main = middyfy(createUser);
