import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

// import schema from './schema';

const listUser: ValidatedEventAPIGatewayProxyEvent<any> = async () => {
  try {
    const users = 'muitos users'
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
