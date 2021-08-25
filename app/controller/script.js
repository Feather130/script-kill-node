'use strict';
const Controller = require('egg').Controller;

const createRule = {
  type: 'object',
  properties: {
    image_url: { type: 'string' },
    title: { type: 'string' },
    describe: { type: 'string' },
    author: { type: 'string' },
    issue: { type: 'string' },
    content: { type: 'string' },
    is_hot: { type: 'boolean' },
    is_new: { type: 'boolean' },
    is_recommend: { type: 'boolean' },
    has_video: { type: 'boolean' },
    price: { type: 'number' },
    grade: { type: 'number', minimum: 0, maximum: 10 },
    trait: { type: 'string' },
    tags: { type: 'array', minItems: 1, items: {
      type: 'object',
      properties: {
        value: { type: 'string' },
        show: { type: 'boolean' },
      },
      required: [ 'value', 'show' ],
    },
    oneOf: [
      { properties: { value: { type: 'string', enum: [ '现实', '恐怖', '欢乐', '情感', '武侠', '灵异', '魔幻', '科幻' ] } } },
    ],
    },
    people: { type: 'array', maxItems: 3, minItems: 3, items: { type: 'integer' } },
    duration: { enum: [ '1小时以下', '1-2小时', '2-3小时', '3-5小时', '5小时以上' ] },
    difficulty: { enum: [ '入门', '简单', '适中', '困难', '烧脑' ] },
    type: { enum: [ '盒装', '城限' ] },
  },
  required: [
    'image_url',
    'title',
    'describe',
    'author',
    'issue',
    'content',
    'is_hot',
    'is_new',
    'is_recommend',
    'has_video',
    'price',
    'grade',
    'tags',
    'people',
    'duration',
    'difficulty',
    'type',
  ],
};

const updateRule = { ...createRule, required: [] };

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
    const error = app.schemaValidator.validateSchema(createRule);
    console.log(error);
    // if (error) {
    // // TODO 更好的错误提示
    //   console.log(error);
    //   ctx.body = {
    //     error,
    //     status: 400,
    //   };
    //   ctx.status = 400;
    //   return;
    // }
    // TODO 查重
    // const params = {
    //   ...body,
    //   creation_time: new Date(),
    //   update_time: new Date(),
    // };
    // await service.script.create(params);
    // ctx.body = {
    //   message: '剧本添加成功',
    //   status: 201,
    // };
    // ctx.status = 201;
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

  // async update() {
  //   const { ctx, service } = this;
  //   const { app, params, request } = ctx;
  //   const { id } = params;
  //   const { body } = request;
  //   const error = app.validator.validate(updateRule, body);
  //   if (error) {
  //   // TODO 更好的错误提示
  //     console.log(error);
  //     ctx.body = {
  //       error,
  //       status: 400,
  //     };
  //     ctx.status = 400;
  //     return;
  //   }
  //   const update = {
  //     ...body,
  //     update_time: new Date(),
  //   };
  //   const filter = {
  //     id: Number(id),
  //   };
  //   await service.script.update({ filter, update });
  //   ctx.body = {
  //     data: {},
  //     message: '剧本编辑成功',
  //     status: 200,
  //   };
  //   ctx.status = 200;
  // }
  //
  // async destroy() {
  //   const { ctx, service } = this;
  //   const { params } = ctx;
  //   const { id } = params;
  //   await service.script.destroy({ id });
  //   ctx.status = 204;
  // }
}

module.exports = ScriptController;
