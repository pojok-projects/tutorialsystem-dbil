const uuid = require('uuid/v4')
const { check, validationResult } = require('express-validator')

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
    index: async (req, res, next) => {
        await DynamoDB.index(model, (err, data) => {
            if(err) {
                throw new Error(err)
            }

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
        await DynamoDB.add(model, allData, (err, data) => {
            if(err) {
                throw new Error(err)
            }

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
    },
    show: async (req, res, next) => {

        const id = req.params.id

        // get data from database
        await DynamoDB.show(model, id, (err, data) => {
            if(err) {
                throw new Error(err)
            }

            res.send(data.Item)
        })
    }
}