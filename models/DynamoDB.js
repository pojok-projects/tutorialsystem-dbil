const AWS = require('aws-sdk')
const dotenv = require('dotenv')
dotenv.config()

if(process.env.DYNAMODB_TYPE == 'local') {
    AWS.config.update({
        accessKeyId: 'dynamoDBLocal',
        secretAccessKey: 'secret',
        region: 'us-west-2',
        endpoint: 'http://localhost:8000'
    })
} else {
    AWS.config.update({
        accessKeyId: process.env.DYNAMODB_KEY,
        secretAccessKey: process.env.DYNAMODB_SECRET,
        region: process.env.DYNAMODB_REGION
    })
}

const dynamoDB = new AWS.DynamoDB()
const docClient = new AWS.DynamoDB.DocumentClient()

module.exports = {
    index: async (table, callback) => {
        let params = {
            TableName: table
        }

        await docClient.scan(params, (err, data) => {
            if(err) {
                return callback('no data found', null)
            } else {
                return callback(null, data)
            }
        })
    },
    add: async (table, data, callback) => {
        let params = {
            TableName: table,
            Item: data
        }

        await docClient.put(params, (err, data) => {
            if(err) {
                return callback('error save a new data..!!', null)
            } else {
                return callback(null, 'success')
            }
        })
    },
    show: async (table, id, callback) => {
        let params = {
            TableName: table,
            Key: {
                id: id
            }
        }

        await docClient.get(params, (err, data) => {
            if(err) {
                return callback('error get data..!!', null)
            } else {
                return callback(null, data)
            }
        })
    },
    createTable: (nameDB) => {
        let dataTable = {
            TableName: nameDB,
            KeySchema: [
                {
                    AttributeName: 'id',
                    KeyType: 'HASH'
                }
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'id',
                    AttributeType: 'S'
                }
            ],
            ProvisionedThroughput: {       
                ReadCapacityUnits: 1, 
                WriteCapacityUnits: 1
            }
        };
    
        dynamoDB.createTable(dataTable, (err, data) => {
            if (err) {
                console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Created table: ", nameDB);
            }
        });
    },
    deleteTable: (nameDB) => {
        let dataTable = {
            TableName: nameDB
        };
    
        dynamoDB.deleteTable(dataTable, (err, data) => {
            if (err) {
                console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Table deleted: ", nameDB);
            }
        });
    }
}