const express = require('express')
const category = express()

const { UserController } = require('../../../controller')

category.get('/', UserController.index)
category.post(
    '/store',
    UserController.validate('store'),
    UserController.store
)
category.get('/:id', UserController.show)
category.post('/search', UserController.search)
category.post('/update/:id',UserController.update)
category.post('/delete/:id',UserController.delete)

module.exports = category