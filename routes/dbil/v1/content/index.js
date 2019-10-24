const express = require('express')
const content = express()

const metadata = require('./metadata')
const category = require('./category')
const subtitle = require('./subtitle')

content.use('/metadata', metadata)
content.use('/category', category)
content.use('/subtitle', subtitle)

module.exports = content