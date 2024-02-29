"use strict";

const Cart = require('../model/cart');
const Item = require('../model/item');
const _res = require("../util/response");

// create and Save a new record
exports.create = (req, res) => {
    
};

// retrieve and return all records from the database.
exports.find = (req, res) => {
    Cart.find({
        $and: [
            {
                userId: req.params.id,
                isActive: true
            }
        ]   
    }, 
    {
        cookId: 1.0,
        items: 1.0,
        description: 1.0,
    }).then(result => {
        if(!result || result.length < 1){
            return _res.cError(res, 'Item not found.');
        }
        result = util.clone(result);
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
    Cart.findByIdAndUpdate(req.params.id, {
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
