"use strict";

const Cook = require('../model/cook');
const Item = require('../model/item');
const _res = require("../util/response");

// create and Save a new record
exports.create = (req, res) => {
    
};

// retrieve and return all records from the database.
exports.findAll = (req, res) => {
    Cook.find({
        $and: [
            {
                isActive: true
            }
        ]   
    }, 
    {
        name: 1.0,
        address: 1.0,
        mobileNo: 1.0,
        emailId: 1.0,
        isVeg: 1.0,
        images: 1.0,
        items: 1.0
    }).then(result => {
        if(!result || result.length < 1){
            return _res.cError(res, 'Cook not found.');
        }
        return _res.success(res, result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return _res.nError(res, 'Cook not found.');
        }
        return _res.error(res, 'Internal Server Error.');
    });
};

// find a single record with an id
exports.findOne = (req, res) => {
    Cook.findById(req.params.id).then(result => {
        if(!result || !result._id){
            return _res.cError(res, 'Cook not found.');
        }
        // load items(s)
        Item.find({
            $and: [
                {
                    _id: {$in: result.items},
                    isActive: true
                }
            ]
        },
        {
            name: 1.0,
            description: 1.0,
            price: 1.0,
            discount: 1.0,
            images: 1.0
        }).then(iResult => {
            if(!iResult || iResult.length < 1){
                return _res.success(res, result);
            }
            result.items = util.clone(iResult);
            return _res.success(res, result);
        }).catch(err => {
            return _res.success(res, result);
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return _res.nError(res, 'Cook not found.');
        }
        return _res.error(res, 'Internal Server Error.');
    });


    Client.findById(req.params.id)
    .then(result => {
        if(!result) {
            return _res.cError(res, 'Record not found with id ' + req.params.id);
        }
        return _res.success(res, result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return _res.nError(res, 'Record not found with id ' + req.params.id);
        }
        return _res.error(res, 'Error retrieving record with id ' + req.params.id);
    });
};

// update a record identified by id in the request
exports.update = (req, res) => {
    
};

// delete a record with the specified id in the request
exports.delete = (req, res) => {
    let userId = req.headers['user-id'] || '';
    Cook.findByIdAndUpdate(req.params.id, {
        isActive: false,
        updatedBy: userId || null
    }).then(result => {
        if(!result) {
            return _res.cError(res, 'Record not found with id ' + req.params.id);
        }
        return _res.success(res, true, 'Record deleted successfully.');
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return _res.nError(res, 'Record not found with id ' + req.params.id);
        }
        return _res.error(res, 'Could not delete record with id ' + req.params.id);
    });
};

// search records by text.
exports.search = (req, res) => {
    Cook.find({name: new RegExp(req.params.text, 'i')})
    .then(result => {
        return _res.success(res, result);
    }).catch(err => {
        return _res.error(res, err.message || 'Some error occurred while retrieving records.');
    });
};