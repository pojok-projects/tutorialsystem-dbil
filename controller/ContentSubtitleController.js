const uuid = require('uuid/v4')
const { check, validationResult } = require('express-validator')

// include helpers
const helper = require('./HelperController')
const _ = require('underscore')

// Set Table Connection
const model = 'ContentSubtitle'
const DynamoDB = require('../models/DynamoDB.js')

module.exports = {
    validate: (method) => {
        switch(method) {
            case 'store': {
                return [
                    check('name', 'The fields name is required').exists()
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

        DynamoDB.index(model, limit, nextpage)
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
            description
        } = req.body

        let allData = {
            id: uuid(),
            name: name,
            description: description ? description : null
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
    search: (req, res, next) => {
        let err = {
            message: 'feature has been disabled'
        }
        next(err)
    },
    update: (req, res, next) => {

        const id = req.params.id

        // update data from database
        DynamoDB.update(model, id, req.body)
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