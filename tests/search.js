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

let data = {
    video_title: "NodeJS"
}

let expression = []
let expressionName = {}
let expressionValue = {}

for (var key in data) {
  if (data.hasOwnProperty(key)) {
    const item = data[key];
    const replace = key.toString().replace('_', '')

    const itemtwo = ':' + replace
    const itemhashtag = '#' + replace

    const dataexpression = itemhashtag + ' = ' + itemtwo
    expression.push(dataexpression)

    expressionName[itemhashtag] = key
    expressionValue[itemtwo] = item
  }
}

// console.log(expression.toString())
// console.log(expressionName)
// console.log(expressionValue)

let params = {
    TableName: 'ContentMetadata',
    KeyConditionExpression: "#videotitle = :videotitle",
    ExpressionAttributeNames: {
        '#videotitle': 'video_title'
    },
    ExpressionAttributeValues: {
        ':videotitle': 'update'
    }
}

// let params = {
//     TableName: 'ContentMetadata',
//     KeyConditionExpression: expression.toString(),
//     ExpressionAttributeNames: expressionName,
//     ExpressionAttributeValues: expressionValue
// }

docClient.query(params, (err, data) => {
    if(err) {
        console.log(JSON.stringify(err, null, 2))
    } else {
        console.log(JSON.stringify(data, null, 2))
    }
})