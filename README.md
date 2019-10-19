# tutorialsystem-dbil
Database Interface Layer of Tutorialinaja by NodeJS

# Installation for Development
* Install DynamoDB Local [HERE](https://docs.aws.amazon.com/en_us/amazondynamodb/latest/developerguide/DynamoDBLocal.html)
* Set `DYNAMODB_TYPE` at `.env` to `local`
* Setup Table by Command: `node models/table.js` or `yarn create-table`

# ENV Details
* `DYNAMODB_TYPE` set `local` for local dynamodb and `aws` for production. When set to local, this env not used: 
  * `DYNAMODB_KEY`
  * `DYNAMODB_SECRET`
  * `DYNAMODB_REGION`
* `DYNAMODB_INDEX_LIMIT` will limit output when return index data and set `nextpage` for pagination, if .env not set, default return index data is `25`
* `DYNAMODB_MAX_LIMIT` will set max limit,  if query set more than what .env set, then it will return error, if .env not set, default max limit is `100`

# Reference
* [AWS Docs](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.html)
* [GraphQL](https://github.com/serverless/examples/blob/master/aws-node-graphql-api-with-dynamodb/handler.js)
* [GSI vs LSI](https://stackoverflow.com/questions/50081459/global-vs-local-secondary-indexes-in-dynamodb)
* [Searching Query Perform](https://stackoverflow.com/questions/50081983/searching-on-array-items-on-a-dynamodb-table)
* [DynamoDB Elastic Search](https://aws.amazon.com/id/blogs/compute/indexing-amazon-dynamodb-content-with-amazon-elasticsearch-service-using-aws-lambda/)