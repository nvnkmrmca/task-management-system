'use strict';

const middleware = require('./middleware');
const _ctrl = require('../controller/item');
const route = '/item';

module.exports = (app) => {
    // Create
    app.post(route, _ctrl.create);

    // Retrieve all
    app.get(route + 's/:id', _ctrl.findAll);

    // Retrieve single with id
    app.get(route + '/:id', middleware.checkToken, _ctrl.findOne);

    // Update by id
    app.put(route + '/:id', middleware.checkToken, _ctrl.update);

    // Delete by id
    app.delete(route + '/:id', middleware.checkToken, _ctrl.delete);

    // Search 
    app.get(route + '/search/:text', middleware.checkToken, _ctrl.search);
};