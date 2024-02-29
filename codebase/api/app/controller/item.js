"use strict";

const Item = require('../model/item');
const _res = require("../util/response");

// create and Save a new record
exports.create = (req, res) => {
    
};

// retrieve and return all records from the database.
exports.findAll = (req, res) => {
    Item.find({
        $and: [
            {
                cookId: req.params.id,
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
    }).then(result => {
        if(!result || result.length < 1){
            new Item({
                cookId: req.params.id,
                name: 'Idly',
                description: 'Special Idly',
                price: 25,
                discount: 5,
                images: [],
                isActive: true
            }).save().then(sresult => {

            }).catch(err => {
                console.log(err)
            });
            return _res.cError(res, 'Item not found.');
        }
        return _res.success(res, result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return _res.nError(res, 'Item not found.');
        }
        return _res.error(res, 'Internal Server Error.');
    });
};

// find a single record with an id
exports.findOne = (req, res) => {
    Item.findById(req.params.id).then(result => {
        if(!result){
            return _res.cError(res, 'Item not found.');
        }
        return _res.success(res, result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return _res.nError(res, 'Item not found.');
        }
        return _res.error(res, 'Internal Server Error.');
    });
};

// update a record identified by id in the request
exports.update = (req, res) => {
    
};

// delete a record with the specified id in the request
exports.delete = (req, res) => {
    let userId = req.headers['user-id'] || '';
    Item.findByIdAndUpdate(req.params.id, {
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
    Item.find({name: new RegExp(req.params.text, 'i')})
    .then(result => {
        return _res.success(res, result);
    }).catch(err => {
        return _res.error(res, err.message || 'Some error occurred while retrieving records.');
    });
};