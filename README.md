# tutorialsystem-dbil
Database Interface Layer of Tutorialinaja by NodeJS

# Installation for Development
* Install DynamoDB Local [HERE](https://docs.aws.amazon.com/en_us/amazondynamodb/latest/developerguide/DynamoDBLocal.html)
* Set `DYNAMODB_TYPE` at `.env` to `local`
* Setup Table by Command: `node models/table.js` or `yarn create-table`

# Reference
* [AWS Docs](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.html)
* [GraphQL](https://github.com/serverless/examples/blob/master/aws-node-graphql-api-with-dynamodb/handler.js)
* [GSI vs LSI](https://stackoverflow.com/questions/50081459/global-vs-local-secondary-indexes-in-dynamodb)
* [Searching Query Perform](https://stackoverflow.com/questions/50081983/searching-on-array-items-on-a-dynamodb-table)
* [DynamoDB Elastic Search](https://aws.amazon.com/id/blogs/compute/indexing-amazon-dynamodb-content-with-amazon-elasticsearch-service-using-aws-lambda/)