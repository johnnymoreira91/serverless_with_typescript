import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const createUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    return formatJSONResponse({
      statusCode: 200,
      message: `Hello ${event.body.name}, your email is ${event.body.email}`
    });
  } catch (error) {
    return formatJSONResponse({
      statusCode: 500,
      message: `Error do list users`
    });
  }
};

export const main = middyfy(createUser);
