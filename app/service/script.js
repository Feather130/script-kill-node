'use strict';
const Service = require('egg').Service;

class ScriptService extends Service {
  async index(params) {
    const { people, tag, duration, difficulty, fields, paginateOptions } = params;
    const obj = {};
    let $project = { _id: 0 };
    if (people) {
      obj.$expr = {
        $eq: [
          {
            $sum: {
              $slice: [ '$people', 2 ],
            },
          },
          people,
        ],
      };
    }
    if (tag) {
      obj.tags = {
        $in: [ tag ],
      };
    }
    if (duration) {
      obj.duration = duration;
    }
    if (difficulty) {
      obj.difficulty = difficulty;
    }
    if (fields) {
      $project = Object.assign({ ...$project }, fields);
    } else {
      $project = Object.assign({ ...$project }, { __v: 0 });
    }
    const aggregate = this.ctx.model.Script.aggregate([{ $match: { ...obj } }, { $project }]);
    return await this.ctx.model.Script.aggregatePaginate(aggregate, paginateOptions);
  }
}

module.exports = ScriptService;
