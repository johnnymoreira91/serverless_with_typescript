import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import prisma from '@database/index'

// import schema from './schema';

const listUser: ValidatedEventAPIGatewayProxyEvent<any> = async () => {
  try {
    const users = await prisma.user.findMany()
    return {
      statusCode: 201,
      body: JSON.stringify({
        users
      }),
    };
  } catch (error) {
    return formatJSONResponse({
      message: error.meta
    });
  }
};

export const main = middyfy(listUser);
