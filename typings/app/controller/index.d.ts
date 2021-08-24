// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportScript = require('../../../app/controller/script');

declare module 'egg' {
  interface IController {
    script: ExportScript;
  }
}
