'use strict';
const Controller = require('egg').Controller;

const createRule = {
  image_url: 'url',
  title: 'string',
  describe: 'string',
  author: 'string',
  issue: 'string',
  is_hot: 'boolean',
  is_new: 'boolean',
  is_recommend: 'boolean',
  has_video: 'boolean',
  price: 'number',
  grade: { type: 'number', max: 10, min: 0 },
  trait: { type: 'string', required: false },
  tags: { type: 'array', itemType: 'string' },
  people: { type: 'array', itemType: 'number', max: 3, min: 3 },
  duration: { type: 'enum', values: [ '1小时以下', '1-2小时', '2-3小时', '3-5小时', '5小时以上' ] },
  difficulty: { type: 'enum', values: [ '入门', '简单', '适中', '困难', '烧脑' ] },
  type: { type: 'enum', values: [ '盒装', '城限' ] },
};

const updateRule = {
  image_url: { type: 'url', required: false },
  title: { type: 'string', required: false },
  describe: { type: 'string', required: false },
  author: { type: 'string', required: false },
  issue: { type: 'string', required: false },
  is_hot: { type: 'boolean', required: false },
  is_new: { type: 'boolean', required: false },
  is_recommend: { type: 'boolean', required: false },
  has_video: { type: 'boolean', required: false },
  price: { type: 'number', required: false },
  grade: { type: 'number', max: 10, min: 0, required: false },
  trait: { type: 'string', required: false },
  tags: { type: 'array', itemType: 'string', required: false },
  people: { type: 'array', itemType: 'number', max: 3, min: 3, required: false },
  duration: { type: 'enum', values: [ '1小时以下', '1-2小时', '2-3小时', '3-5小时', '5小时以上' ], required: false },
  difficulty: { type: 'enum', values: [ '入门', '简单', '适中', '困难', '烧脑' ], required: false },
  type: { type: 'enum', values: [ '盒装', '城限' ], required: false },
};

class ScriptController extends Controller {
  async index() {
    const { ctx, service } = this;
    const { query } = ctx;
    const { people, tag, duration, difficulty, fields, page_size, current_page } = query;
    const paginateOptions = {};
    if (current_page) {
      paginateOptions.page = current_page;
    }
    if (page_size) {
      paginateOptions.limit = page_size;
    }
    const params = { people: Number(people) || undefined, tag, duration, difficulty, paginateOptions };
    if (fields) {
      params.fields = fields.split(',').reduce((pre, current) => ({ ...pre, [current]: 1 }), {});
    }
    const result = await service.script.index(params);
    const { data, paginator } = result;
    const { total_num, page_size: pageSize, current_page: currentPage, total_page, prev, next } = paginator;
    const filter = {
      data,
      paginator: {
        total_num,
        page_size: pageSize,
        current_page: currentPage,
        total_page,
        prev,
        next,
      },
    };
    ctx.body = {
      data: filter,
      status: 200,
    };
    ctx.status = 200;
  }

  async create() {
    const { ctx, service } = this;
    const { request, app } = ctx;
    const { body } = request;
    const error = app.validator.validate(createRule, body);
    if (error) {
    // TODO 更好的错误提示
      console.log(error);
      ctx.body = {
        error,
        status: 400,
      };
      ctx.status = 400;
      return;
    }
    // TODO 查重
    const params = {
      ...body,
      creation_time: new Date(),
      update_time: new Date(),
    };
    await service.script.create(params);
    ctx.body = {
      message: '剧本添加成功',
      status: 201,
    };
    ctx.status = 201;
  }

  async show() {
    const { ctx, service } = this;
    const { params } = ctx;
    const { id } = params;
    const result = await service.script.show({ id });
    ctx.body = {
      data: result,
      status: 200,
    };
    ctx.status = 200;
  }

  async update() {
    const { ctx, service } = this;
    const { app, params, request } = ctx;
    const { id } = params;
    const { body } = request;
    const error = app.validator.validate(updateRule, body);
    if (error) {
    // TODO 更好的错误提示
      console.log(error);
      ctx.body = {
        error,
        status: 400,
      };
      ctx.status = 400;
      return;
    }
    const update = {
      ...body,
      update_time: new Date(),
    };
    const filter = {
      id: Number(id),
    };
    await service.script.update({ filter, update });
    ctx.body = {
      data: {},
      message: '剧本编辑成功',
      status: 200,
    };
    ctx.status = 200;
  }

  async destroy() {
    const { ctx, service } = this;
    const { params } = ctx;
    const { id } = params;
    await service.script.destroy({ id });
    ctx.status = 204;
  }
}

module.exports = ScriptController;
