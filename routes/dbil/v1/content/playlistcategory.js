const express = require('express')
const playlistcategory = express()

const { PlaylistCategoryController } = require('../../../../controller')

playlistcategory.get('/', PlaylistCategoryController.index)
playlistcategory.post(
    '/store',
    PlaylistCategoryController.validate('store'),
    PlaylistCategoryController.store
)
playlistcategory.get('/:id', PlaylistCategoryController.show)
playlistcategory.post('/search', PlaylistCategoryController.search)
playlistcategory.post('/update/:id',PlaylistCategoryController.update)
playlistcategory.post('/delete/:id',PlaylistCategoryController.delete)

module.exports = playlistcategory