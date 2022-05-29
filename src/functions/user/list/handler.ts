import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

// import schema from './schema';

const listUser: ValidatedEventAPIGatewayProxyEvent<any> = async () => {
  const users = [
    {id: 1, name: 'Johnny'},
    {id: 2, name: 'Amanda'},
  ]
  try {
    // return formatJSONResponse({
    //   statusCode: 200,
    //   users
    // });
    return {
      statusCode: 201,
      body: JSON.stringify({
        users
      }),
    };
  } catch (error) {
    return formatJSONResponse({
      statusCode: 500,
      message: `Error do list users`
    });
  }
};

export const main = middyfy(listUser);
