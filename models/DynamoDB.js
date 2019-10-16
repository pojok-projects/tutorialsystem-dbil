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
    index: (table) => {
        let params = {
            TableName: table
        }
        
        return new Promise((resolve, reject) => {
            docClient.scan(params, (err, data) => {
                if(err) {
                    reject(new Errror('no data found'))
                }

                resolve(data)
            })
        })
    },
    add: (table, data, callback) => {
        let params = {
            TableName: table,
            Item: data
        }

        return new Promise((resolve, reject) => {
            docClient.put(params, (err, data) => {
                if(err) {
                    reject(new Errror('error save a new data'))
                }

                resolve('success')
            })
        })
    },
    show: (table, id) => {
        let params = {
            TableName: table,
            Key: {
                id: id
            }
        }

        return new Promise((resolve, reject) => {
            docClient.get(params, (err, data) => {
                if(err) {
                    reject(new Errror(err))
                }

                resolve(data)
            })
        })
    },
    update: (table, id, data, callback) => {
        let params = {
            TableName: table,
            Key: {
                id: id
            }
        }

        docClient.update(params, (err, data) => {
            if(err) {
                return callback('error update data', null)
            } else {
                return callback(null, 'success')
            }
        })
    },
    delete: (table, id, callback) => {
        let params = {
            TableName: table,
            Key: {
                id: id
            }
        }

        return new Promise((resolve, reject) => {
            docClient.delete(params, (err, data) => {
                if(err) {
                    reject(new Errror('error delete data'))
                }

                resolve('success')
            })
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