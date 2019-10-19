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
metadata.post('/search', ContentMetadataController.search)
metadata.post('/update/:id',ContentMetadataController.update)
metadata.post('/delete/:id',ContentMetadataController.delete)

module.exports = metadata