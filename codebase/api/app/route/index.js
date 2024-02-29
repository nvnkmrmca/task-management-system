'use strict';

module.exports = (app) => {
    require('./heartbeat')(app),
    require('./account')(app),
    require('./cook')(app),
    require('./item')(app),
    require('./cart')(app)
};