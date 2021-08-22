/* eslint valid-jsdoc: "off" */

'use strict';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1629592501455_6926';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: false,
  };

  config.mongoose = {
    url: 'mongodb://192.168.56.103:27017/db_script_kill',
    options: {},
    plugins: [ aggregatePaginate ],
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
