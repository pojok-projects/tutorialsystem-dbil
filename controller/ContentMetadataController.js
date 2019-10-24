const uuid = require('uuid/v4')
const { check, validationResult } = require('express-validator')
const dotenv = require('dotenv')
dotenv.config()

// include helpers
const helper = require('./HelperController')
const _ = require('underscore')

// Set Table Connection
const model = require('../models/ContentMetadata')
const DynamoDB = require('../models/DynamoDB.js')

module.exports = {
    validate: (method) => {
        switch(method) {
            case 'store': {
                return [
                    check('user_id', 'The fields user_id is required').exists(),
                    check('category_id', 'The fields category_id is required').exists(),
                    check('video_title', 'The fields video_title is required').exists(),
                    check('video_description', 'The fields video_description is required').exists(),
                    check('video_genre', 'The fields video_genre is required').exists(),
                    check('privacy', 'The fields privacy is required').exists(),
                ]
            }
        }
    },
    index: (req, res, next) => {
        
        let nextpage = req.query.nextpage
        let limit = req.query.limit

        if(!nextpage) {
            nextpage = null
        }

        if(!limit) {
            if(process.env.DYNAMODB_INDEX_LIMIT) {
                limit = process.env.DYNAMODB_INDEX_LIMIT
            } else {
                limit = 25
            }
        } else {
            let maxlimit = 100

            if(process.env.DYNAMODB_MAX_LIMIT) {
                maxlimit = process.env.DYNAMODB_MAX_LIMIT
            }

            if(limit > maxlimit) {
                let err = {
                    message: 'limit too big, max: '+ maxlimit
                }
                next(err)
            }
        }

        DynamoDB.index(model.table, limit, nextpage)
        .then((data) => {
            let resMess = ', no data found with this query'
            let resData = []

            if(data.Count > 0) {
                resMess = ', data has been found'
                resData = data.Items
            }

            res.send({
                status: {
                    code: 200,
                    message: 'index list query has been performed' + resMess,
                    total: data.Count,
                    nextpage: data.LastEvaluatedKey ? data.LastEvaluatedKey.id : null
                },
                result: resData
            })
        })
        .catch((err) => {
            next(err)
        })
    },
    store: async (req, res, next) => {
        
        // errors validate check
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                code: 422,
                success: false,
                message: errors.array()
            });
        }

        // get from body request
        const {
            user_id,
            category_id,
            video_title,
            video_description,
            video_genre,
            video_viewers,
            video_share,
            video_saves,
            video_downloads,
            thumbnail,
            privacy,
            metavideos,
            subtitle,
            comments,
            likes,
            dislikes
        } = req.body

        let allData = {
            id: uuid(),
            user_id: user_id,
            category_id: category_id,
            video_title: video_title,
            video_description: video_description,
            video_genre: video_genre,
            video_viewers: video_viewers ? video_viewers : null,
            video_share: video_share ? video_share : null,
            video_saves: video_saves ? video_saves : null,
            video_downloads: video_downloads ? video_downloads : null,
            thumbnail: thumbnail ? thumbnail : null,
            privacy: privacy,
            metavideos: metavideos ? metavideos : null,
            subtitle: subtitle ? subtitle : null,
            comments: comments ? comments : null,
            likes: likes ? likes : null,
            dislikes: dislikes ? dislikes : null
        }

        // save data to database
        DynamoDB.add(model.table, allData)
        .then((data) => {
            res.send({
                status: {
                    code: 200,
                    message: 'data has been saved'
                },
                result: {
                    id: allData.id
                }
            })
        })
        .catch((err) => {
            next(err)
        })
    },
    show: (req, res, next) => {

        const id = req.params.id

        // get data from database
        DynamoDB.show(model.table, id)
        .then((data) => {
            if(_.isEmpty(data)) {
                throw new Error('data not found')
            } else {
                res.send(data.Item)
            }
        })
        .catch((err) => {
            next(err)
        })
    },
    search: (req, res, next) => {
        let err = {
            message: 'feature has been disabled'
        }
        next(err)
    },
    update: (req, res, next) => {

        const id = req.params.id

        // update data from database
        DynamoDB.update(model.table, id, req.body)
        .then((data) => {
            res.send({
                status: {
                    code: 200,
                    message: 'data has been updated'
                },
                result : {
                    id: id
                }
            })
        })
        .catch((err) => {
            next(err)
        })
    },
    delete: (req, res, next) => {

        const id = req.params.id

        // delete data from database
        DynamoDB.delete(model.table, id)
        .then((data) => {
            res.send({
                status: {
                    code: 200,
                    message: 'data has been deleted'
                }
            })
        })
        .catch((err) => {
            next(err)
        })
    }
}