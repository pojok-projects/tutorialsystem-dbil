const uuid = require('uuid/v4')
const { check, validationResult } = require('express-validator')

// include helpers
const helper = require('./HelperController')
const _ = require('underscore')

// Set Table Connection
const model = 'ContentMetadata'
const DynamoDB = require('../models/DynamoDB.js')

const validate = (method) => {
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
}

module.exports = {
    validate,
    index: (req, res, next) => {
        DynamoDB.index(model)
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
                    total: data.Count
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
            privacy: privacy,
            metavideos: metavideos ? metavideos : null,
            subtitle: subtitle ? subtitle : null,
            comments: comments ? comments : null,
            likes: likes ? likes : null,
            dislikes: dislikes ? dislikes : null
        }

        // save data to database
        DynamoDB.add(model, allData)
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
        DynamoDB.show(model, id)
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
    update: (req, res, next) => {
        //
    },
    delete: (req, res, next) => {

        const id = req.params.id

        // delete data from database
        DynamoDB.delete(model, id)
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