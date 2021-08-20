const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/db_script_kill";

exports.index = async (ctx) => {
    ctx.body='list'
};

exports.create = async (ctx) => {
    ctx.body='create'
};

exports.show = async (ctx) => {
    ctx.body='show'
};

exports.update = async (ctx) => {
    ctx.body='update'
};

exports.destroy = async (ctx) => {
    ctx.body='destroy'
};
