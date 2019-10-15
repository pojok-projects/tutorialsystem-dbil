const { DynamoDBController } = require('../controller')

const newTable = [
    'ContentCategory',
    'ContentMetadata',
    'ContentSubtitle',
    'PlaylistCategory',
    'User'
]

newTable.forEach((items) => {
    DynamoDBController.createTable(items)
})