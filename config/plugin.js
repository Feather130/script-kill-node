'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  validateSchema: {
    enable: true,
    package: 'egg-validate-schema',
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
};
