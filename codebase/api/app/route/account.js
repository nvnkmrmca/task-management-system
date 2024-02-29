'use strict';

const middleware = require('./middleware');
const _ctrl = require('../controller/account');
const route = '/account';

module.exports = (app) => {
    // login
    app.post(route + '/login', _ctrl.login);

    // profile
    app.get(route + '/profile', _ctrl.profile);
    
    // change password
    app.post(route + '/changepassword/:id', middleware.checkToken, _ctrl.changePassword);

    //sign up
    app.post(route + '/signup', _ctrl.signUp);
};