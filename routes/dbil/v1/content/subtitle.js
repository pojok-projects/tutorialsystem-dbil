const express = require('express')
const subtitle = express()

const { ContentSubtitleController } = require('../../../../controller')

subtitle.get('/', ContentSubtitleController.index)
subtitle.post(
    '/store',
    ContentSubtitleController.validate('store'),
    ContentSubtitleController.store
)
subtitle.get('/:id', ContentSubtitleController.show)
subtitle.post('/search', ContentSubtitleController.search)
subtitle.post('/update/:id',ContentSubtitleController.update)
subtitle.post('/delete/:id',ContentSubtitleController.delete)

module.exports = subtitle