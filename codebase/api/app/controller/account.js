"use strict";

const jwt = require('jsonwebtoken');
var shortid = require('shortid');
const config = require('../config/index');
const User = require('../model/user');
const Cook = require('../model/cook');
const Item = require('../model/item');
const util = require("../util/index");
const _res = require("../util/response");


// validate and verify user
exports.login = (req, res) => {
    // validate request
    if(!req.body.userName || !req.body.password) {
        return _res.vError(res, 'Validation failed. Please fill all the required fields.');
    }

    // verify user
    User.find({
        $and: [
            {
                mobileNo: req.body.userName,
                password: req.body.password,
                isActive: true
            }
        ] 
    }, 
    {
        _id: 1.0,
        number: 1.0,
        name: 1.0,
        role: 1.0
    }).then(result => {
        if(!result || result.length < 1){
            return _res.cError(res, 'User not found.');
        }
        // generate token
        let token = jwt.sign({ username: req.body.userName },config.secret, { expiresIn: '24h' }); // expires in 24 hours
        return _res.success(res, {
            token: token,
            userId: result[0]._id,
            name: result[0].name, 
            role: result[0].role
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return _res.nError(res, 'User not found.');
        }
        return _res.error(res, 'Internal Server Error.');
    });
};

// load user profile
exports.profile = (req, res) => {
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
            new Cook({
                name: 'Sea Shell',
                address: 'Chennai',
                mobileNo: '12345',
                emailId: '',
                isVeg: false,
                images: [],
                items: [],
                isActive: true
            }).save().then(sresult => {

            }).catch(err => {
                console.log(err)
            });
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

// change password
exports.changePassword = (req, res) => {
    // validate request
    if(!req.params.id || !req.body.password || !req.body.newPassword) {
        return _res.vError(res, 'Validation failed. Please fill all the required fields.');
    }
    let userId = req.headers['user-id'] || '';

    // find record and update it with the request body
    Member.findOneAndUpdate({
        _id: req.params.id,
        password: req.body.password
    }, {
        password: req.body.newPassword || '',
        updatedBy: userId
    }, {new: true})
    .then(result => {
        if(!result || !result._id){
            return _res.success(res, false, 'Please enter the valid password.');
        }
        return _res.success(res, true);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return _res.nError(res, 'Record not found with id ' + req.params.id);
        }
        return _res.error(res, 'Internal server error. Error updating record with id ' + req.params.id);
    });
};

// sign up a member
exports.signUp = (req, res) => {
    // validate request
    if(!req.body.name || !req.body.age || !req.body.gender || !req.body.mobileNo || !req.body.emailId){
        return _res.vError(res, 'Validation failed. Please fill all the required fields.');
    }

    Member.findOne({
        $and: [
            {
                $or: [
                    {
                        mobileNo: req.body.mobileNo,
                        // emailId: req.body.emailId
                    }
                ],
                isActive: true
            }
        ]
    }, {
        _id: 1.0,
    }).then(mresult => {
                    // create and save new object
                    new Member({
                        number: req.body.number || '',
                        name: req.body.name || '',
                        age: req.body.age || 0,
                        gender: req.body.gender || '',
                        mobileNo: req.body.mobileNo || '',
                        emailId: req.body.emailId || '',
                        password: req.body.password || '',
                        role: req.body.role || '',
                        image: req.body.image || '',
                        cookId: req.body.image || '',
                        isActive: true,
                        createdBy: ''
                    }).save().then(result => {
                        if(!result || !result._id){
                            return _res.cError(res, 'Data not found. Some problem occurs.');
                        }
                        return _res.success(res, result._id);
                    }).catch(err => {
                        return _res.error(res, err.message || 'Some error occurred while creating a record.');
                    });
               
    }).catch(err => {
        return _res.error(res, err.message || 'Some error occurred while creating a record.');
    });
};