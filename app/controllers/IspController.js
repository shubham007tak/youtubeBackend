const mongoose = require('mongoose');
const response = require('../libs/responseLib')
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib')
const IspModel = mongoose.model('Isp')
const shortid = require('shortid');




let createIsp = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {

            if (req.body.name) {

                resolve(req)
            } else {
                let apiResponse = response.generate(true, 'some fields are empty', 400, null)

                reject(apiResponse)
            }
        })
    }
    let addThisIsp = () => {


        return new Promise((resolve, reject) => {
            let newIsp = new IspModel({
                ispId: shortid.generate(),
                name: req.body.name,
                contact_no: req.body.contact_no,
                max_speed: req.body.max_speed,
                email: req.body.email,
                rating: req.body.rating,
                url: req.body.url,
                description: req.body.description,
                image: req.body.image,
                lowest_price: req.body.lowest_price
            })

            newIsp.save((err, result) => {

                if (err) {
                    logger.error(err.message, 'Isp Controller: createIsp', 10)
                    let apiResponse = response.generate(true, 'failed to save the isp details', 417, null)
                    reject(apiResponse)
                } else {

                    let newIspObj = result.toObject()
                    resolve(newIspObj)

                }
            })
        })
    }
    validateUserInput(req, res)
        .then(addThisIsp)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'isp created', 200, resolve)
            console.log(apiResponse)
            res.send(apiResponse)
        }).catch(err => res.send(err))
}


let getAllIsps = (req, res) => {
    IspModel.find()
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Isp Controller: getAllUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find Isp Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Isp Found', 'Isp Controller: getAllUser', 7)
                let apiResponse = response.generate(true, 'No Isp Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Isp Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}

let deleteIsp = (req, res) => {

    IspModel.findOneAndRemove({ 'userId': req.params.userId }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Isp Controller: deleteIsp', 10)
            let apiResponse = response.generate(true, 'Failed To delete isp', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Isp Found', 'Isp Controller: deleteIsp', 7)
            let apiResponse = response.generate(true, 'No Isp Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted the isp successfully', 200, result)
            res.send(apiResponse)
        }
    });// end isp model find and remove


}// end delete isp

let getSingleIsp = (req, res) => {
    IspModel.findOne({ 'ispId': req.params.ispId })
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Isp Controller: getSingleIsp', 10)
                let apiResponse = response.generate(true, 'Failed To Find Isp Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Isp Found', 'Isp Controller:getSingleIsp', 7)
                let apiResponse = response.generate(true, 'No Isp Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Isp Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get single isp

let editIsp = (req, res) => {

    let options = req.body;
    IspModel.update({ 'userId': req.params.userId }, options).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Isp Controller:editIsp', 10)
            let apiResponse = response.generate(true, 'Failed To edit isp details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Isp Found', 'Isp Controller: editIsp', 7)
            let apiResponse = response.generate(true, 'No Isp Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Isp details edited', 200, result)
            res.send(apiResponse)
        }
    });// end isp model update


}// end edit isp

module.exports = {
    createIsp: createIsp,
    getAllIsps: getAllIsps,
    editIsp: editIsp,
    deleteIsp: deleteIsp,
    getSingleIsp: getSingleIsp
}