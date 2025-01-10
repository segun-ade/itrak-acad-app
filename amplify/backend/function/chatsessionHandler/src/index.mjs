////const awsServerlessExpress = require('aws-serverless-express');
//const awsServerlessExpress = require('@vendia/serverless-express');
import awsServerlessExpress from '@vendia/serverless-express';
//const app = require('./app');
import app from './app';
/**
 * @type {import('http').Server}
 */
const server = awsServerlessExpress.createServer(app);

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
