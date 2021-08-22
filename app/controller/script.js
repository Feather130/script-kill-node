'use strict';
const Controller = require('egg').Controller;

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
}

module.exports = ScriptController;
