const express = require('express')
const category = express()

const { ContentCategoryController } = require('../../../../controller')

category.get('/', ContentCategoryController.index)
category.post(
    '/store',
    ContentCategoryController.validate('store'),
    ContentCategoryController.store
)
category.get('/:id', ContentCategoryController.show)
category.post('/search', ContentCategoryController.search)
category.post('/update/:id',ContentCategoryController.update)
category.post('/delete/:id',ContentCategoryController.delete)

module.exports = category