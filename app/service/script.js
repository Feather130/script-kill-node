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

  async create(params) {
    const res = await new this.ctx.model.Script({ ...params });
    await res.save();
  }

  async show(params) {
    const { ctx } = this;
    const result = await ctx.model.Script.find(params, { _id: 0, __v: 0 });
    if (!result.length) {
      return {};
    }
    return result[0];
  }

  async update(params) {
    const { ctx } = this;
    const { filter, update } = params;
    await ctx.model.Script.updateOne(filter, { $set: { ...update } });
  }

  async destroy(params) {
    const { ctx } = this;
    await ctx.model.Script.remove(params);
  }
}

module.exports = ScriptService;
