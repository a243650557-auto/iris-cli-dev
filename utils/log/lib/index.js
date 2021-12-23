'use strict';

const log = require('npmlog');
// log.level = 'verbose'; //支持自定义
log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
log.addLevel('success', 2000, { fg: 'green', bold: true });
log.heading = 'imooc';
module.exports = log;
