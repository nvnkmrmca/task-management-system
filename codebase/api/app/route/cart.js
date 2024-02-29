'use strict';

const middleware = require('./middleware');
const _ctrl = require('../controller/cart');
const route = '/cart';

module.exports = (app) => {
    // Create
    app.post(route, _ctrl.create);

    // Retrieve all
    app.get(route + 's', middleware.checkToken, _ctrl.find);

    // Update by id
    app.put(route + '/:id', middleware.checkToken, _ctrl.update);

    // Delete by id
    app.delete(route + '/:id', middleware.checkToken, _ctrl.delete);
};