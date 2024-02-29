'use strict';

const _ctrl = require('../controller/heartbeat');
const route = '/heartbeat';

module.exports = (app) => {
    app.route(route).get(_ctrl.get);
};
