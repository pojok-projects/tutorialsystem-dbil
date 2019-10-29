const uuid = require('uuid/v4')
const { check, validationResult } = require('express-validator')

// include helpers
const helper = require('./HelperController')
const _ = require('underscore')

// Set Table Connection
const model = require('../models/User')
const DynamoDB = require('../models/DynamoDB.js')

module.exports = {
    validate: (method) => {
        switch(method) {
            case 'store': {
                return [
                    check('name', 'The fields name is required').exists(),
                    check('email', 'The fields email is required').exists(),
                    check('first_name', 'The fields first_name is required').exists(),
                    check('last_name', 'The fields last_name is required').exists(),
                    check('birth_date', 'The fields birth_date is required').exists(),
                    check('gender', 'The fields gender is required').exists(),
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
    store: (req, res, next) => {
        
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
            name,
            email,
            first_name,
            last_name,
            birth_date,
            gender,
            photo_profile,
            about,
            website_link,
            facebook_link,
            twitter_link,
            linkedin_link,
            following,
            follower,
            like_video,
            dislike_video,
            saved_video,
            history_video,
            playlists
        } = req.body

        let allData = {
            id: uuid(),
            name: name,
            email: email,
            first_name: first_name,
            last_name: last_name,
            birth_date: birth_date,
            gender: gender,
            photo_profile: photo_profile ? photo_profile : null,
            about: about ? about : null,
            website_link: website_link ? website_link : null,
            facebook_link: facebook_link ? facebook_link : null,
            twitter_link: twitter_link ? twitter_link : null,
            linkedin_link: linkedin_link ? linkedin_link : null,
            following: following ? following : null,
            follower: follower ? follower : null,
            like_video: like_video ? like_video : null,
            dislike_video: dislike_video ? dislike_video : null,
            saved_video: saved_video ? saved_video : null,
            history_video: history_video ? history_video : null,
            playlists: playlists ? playlists : null
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