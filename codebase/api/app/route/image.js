'use strict';

const middleware = require('./middleware');
const _ctrl = require('../controller/image');
const route = '/image';

module.exports = (app) => {
    // serve image
    app.get(route + '/:image', middleware.checkToken, _ctrl.serve);
};