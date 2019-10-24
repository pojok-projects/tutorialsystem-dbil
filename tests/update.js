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

const data = {
    category_id: 123,
    video_title: 'update from command sir',
    metavideos: [
        {
            "duration": 30,
            "file_path": "/videos/1080p/tutorial-node-js-bagian-1.mp4",
            "size": 104857600,
            "updated_at": "2019-08-24T22:28:16+07:00",
            "file_name": "tutorial-node-js-bagian-1.mp4",
            "format": "mp4",
            "created_at": "2019-08-24T22:28:16+07:00",
            "id": "cb92f773-c0a9-41dc-8cc9-9be9d680097c",
            "resolution": "1080p"
        },
        {
            "duration": 30,
            "file_path": "/videos/1080p/tutorial-node-js-bagian-1.mp4",
            "size": 104857600,
            "updated_at": "2019-08-24T22:28:16+07:00",
            "file_name": "tutorial-node-js-bagian-1.mp4",
            "format": "mp4",
            "created_at": "2019-08-24T22:28:16+07:00",
            "id": "cb92f773-c0a9-41dc-8cc9-9be9d680097c",
            "resolution": "1080p"
        }
    ]
}

let expression = []
let expressionName = {}
let expressionValue = {}

for (var key in data) {
  if (data.hasOwnProperty(key)) {
    const item = data[key];
    const replace = key.toString().replace('_', '')

    const dataexpression = '#'+ replace + ' = :' + replace
    expression.push(dataexpression)

    expressionName['#' + replace] = key
    expressionValue[':' + replace] = item
  }
}

// console.log(expression.toString())
// console.log(expressionName)
// console.log(expressionValue)


let params = {
    TableName: 'ContentMetadata',
    Key: {
        id: '4dbd0fbf-0603-47d4-a98e-c19925bb0f5a'
    },
    UpdateExpression: "set " + expression.toString(),
    ExpressionAttributeNames: expressionName,
    ExpressionAttributeValues: expressionValue
}

docClient.update(params, (err, data) => {
    if(err) {
        console.log('error update data')
    } else {
        console.log('success')
    }
})