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

let params = {
    TableName: 'ContentMetadata',
    Limit: 1, // limit output
    ExclusiveStartKey: {
        'id': '1041154e-1397-41a4-a956-bcfc2941cf37'
    }
}

docClient.scan(params, (err, data) => {
    if(err) {
        console.log(err)
    } else {
        console.log(data)
    }
})