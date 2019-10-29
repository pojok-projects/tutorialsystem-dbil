const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: 'dynamoDBLocal',
    secretAccessKey: 'secret',
    region: 'us-west-2',
    endpoint: 'http://localhost:8000'
})

const dynamoDB = new AWS.DynamoDB()

let params = {
    TableName: 'ContentMetadata',
}

dynamoDB.describeTable(params, function(err, data) {
    if (err) {
        console.error(err)
    } else {
        console.log(data)
    }
});