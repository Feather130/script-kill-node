'use strict';
const AutoIncrementFactory = require('mongoose-sequence');

module.exports = ({ mongoose }) => {
  const AutoIncrement = AutoIncrementFactory(mongoose);

  const ScriptSchema = new mongoose.Schema({
    image_url: String,
    title: { type: String, unique: true },
    describe: String,
    author: String,
    issue: String,
    is_hot: Boolean,
    is_new: Boolean,
    is_recommend: Boolean,
    has_video: Boolean,
    price: Number,
    grade: { type: Number, max: 10, min: 0 },
    trait: String,
    tags: [ String ],
    people: [ Number, Number, Number ],
    duration: String,
    difficulty: String,
    type: String,
    content: String,
    creation_time: { type: Date, required: false },
    update_time: Date,
  });

  ScriptSchema.plugin(AutoIncrement, { inc_field: 'id' });

  const Script = mongoose.model('Script', ScriptSchema);

  Script.aggregatePaginate.options = {
    customLabels: {
      totalDocs: 'total_num',
      docs: 'data',
      limit: 'page_size',
      page: 'current_page',
      nextPage: 'next',
      prevPage: 'prev',
      totalPages: 'total_page',
      hasPrevPage: 'has_prev',
      hasNextPage: 'has_next',
      pagingCounter: 'pageCounter',
      meta: 'paginator',
    },
  };

  return Script;
};
