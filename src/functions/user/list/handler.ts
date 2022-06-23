import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import listUsers from './function';

// import schema from './schema';

const listUser: ValidatedEventAPIGatewayProxyEvent<any> = async (_event, context) => {
  context.callbackWaitsForEmptyEventLoop= false
  try {
    const users = await listUsers()
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
