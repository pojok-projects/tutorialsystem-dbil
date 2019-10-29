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
}

const docClient = new AWS.DynamoDB.DocumentClient()

const show = (table, id) => {
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
}

show('ContentMetadata', '4dbd0fbf-0603-47d4-a98e-c19925bb0f5a')
.then((items) => {
    console.log(items)
})
.catch((err) => {
    console.error(items)
})