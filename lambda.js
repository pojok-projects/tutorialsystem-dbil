const awsServerlessExpress = require('aws-serverless-express')
const app = require('./')
// const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// app.use(awsServerlessExpressMiddleware.eventContext());

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) =>
  awsServerlessExpress.proxy(server, event, context);