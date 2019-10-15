const express = require('express')
const metadata = express()

const { ContentMetadataController } = require('../../../../controller')

metadata.get('/', ContentMetadataController.index)
metadata.post(
    '/store',
    ContentMetadataController.validate('store'),
    ContentMetadataController.store
)
metadata.get('/:id', ContentMetadataController.show)

module.exports = metadata