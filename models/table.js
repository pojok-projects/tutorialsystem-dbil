const DynamoDB = require('./DynamoDB.js')

const newTable = [
    'ContentCategory',
    'ContentMetadata',
    'ContentSubtitle',
    'PlaylistCategory',
    'User'
]

newTable.forEach((items) => {
    DynamoDB.createTable(items)
})