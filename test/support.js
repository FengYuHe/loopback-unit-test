"use strict";
const app = require('../');
const sum = require('../server/boot/sum');
sum(app);

exports.app = app;

