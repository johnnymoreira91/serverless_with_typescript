import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import userCreate from '@functions/user/create';
import userList from '@functions/user/list'

const serverlessConfiguration: AWS = {
  service: 'teste-aws-ts',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dotenv-plugin'],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    apiName: 'teste-ts',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      NODE_ENV: '${env:STAGE}',
      DB_NAME: '${env:DB_NAME}',
      DB_USER: '${env:DB_USER}',
      DB_PASSWORD: '${env:DB_PASSWORD}',
      DB_HOST: '${env:DB_HOST}',
      DB_PORT: '${env:DB_PORT}',
      REDIS_PORT: '${env:REDIS_PORT}',
      REDIS_HOST: '${env:REDIS_HOST}',
      REDIS_PASSWORD: '${env:REDIS_PASSWORD}',
    },
  },
  // import the function via paths
  functions: { 
    hello,
    userCreate,
    userList
   },
  package: { 
    individually: true
   },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
