'use strict';

module.exports = core;

const path = require('path');
const semver = require('semver');
const colors = require('colors/safe');
//require .js/.json/.node
//.js -> module.export/exports
//.json -> JSON.parse
const pkg = require('../package.json');
const log = require('@iris-cli-dev/log');
const constant = require('./const');
const userHome = require('user-home');
const pathExists = require('path-exists').sync;

let args;
let config;
function core() {
  // TODO
  console.log('exec core');
  try {
    checkPkgVersion();
    checkNodeVersion();
    checkRoot();
    checkUserhome();
    checkInputArgs();
    checkEnv();
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

function checkRoot() {
  const rootCheck = require('root-check');

  rootCheck();
  console.log(process.geteuid());
}

function checkUserhome() {
  console.log('user', userHome);
  if (!userHome || !pathExists(userHome)) {
    throw new Error(colors.red('当前登录用户主目录不存在'));
  }
}

function checkInputArgs() {
  const minimist = require('minimist');
  args = minimist(process.argv.slice(2));
  console.log('args', args);
  checkArgs();
}

function checkArgs() {
  if (args.debug) {
    process.env.LOG_LEVEL = 'verbose';
  } else {
    process.env.LOG_LEVEL = 'info';
  }
  log.level = process.env.LOG_LEVEL;
  console.log('test');
}

function checkEnv() {
  console.log('userHome', userHome);
  const dotenv = require('dotenv');
  const dotenvPath = path.resolve(userHome, '.env');
  if (pathExists(dotenvPath)) {
    console.log('11');
    config = dotenv.config({
      path: dotenvPath
    });
    log.verbose('环境变量', config);
  } else {
    config = createDefaultConfig();
    console.log('config', config);
    log.verbose('环境变量', process.env.CLI_HOME_PATH);
  }
}

function createDefaultConfig() {
  const cliConfig = {
    home: userHome
  };
  if (process.env.CLI_HOME) {
    cliConfig['cliHome'] = path.join(userHome, process.env.CLI_HOME);
  } else {
    cliConfig['cliHome'] = path.join(userHome, constant.DEFAULT_CLI_HOME);
  }
  process.env.CLI_HOME_PATH = cliConfig.cliHome;
}
