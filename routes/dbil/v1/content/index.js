const express = require('express')
const content = express()

const metadata = require('./metadata')
const category = require('./category')
const subtitle = require('./subtitle')
const playlistscategory = require('./playlistcategory')

content.use('/metadata', metadata)
content.use('/category', category)
content.use('/subtitle', subtitle)
content.use('/playlists/category', playlistscategory)

module.exports = content