'use strict';

module.exports = core;

const semver = require('semver');
const colors = require('colors/safe');
//require .js/.json/.node
//.js -> module.export/exports
//.json -> JSON.parse
const pkg = require('../package.json');
const log = require('@iris-cli-dev/log');
const constant = require('./const');
function core() {
  // TODO
  console.log('exec core');
  try {
    checkPkgVersion();
    checkNodeVersion();
  } catch (e) {
    log.error(e.message);
  }
}

function checkPkgVersion() {
  console.log(pkg.version);
  log.success('test', 'sucesss');
  // log();
}

function checkNodeVersion() {
  const currentVersion = semver.valid(semver.coerce(process.version));

  const lowestVersion = constant.LOWEST_NODE_VERSION;
  console.log('lowestVersion', currentVersion, lowestVersion);
  if (semver.gt(lowestVersion, currentVersion)) {
    throw new Error(
      colors.red(`imooc cli 需要安装 v${lowestVersion}以上版本的node`)
    );
  }
}
