'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tasksSchema = new Schema({
    name: { type: String, required: true },
    status: { type: String, required: true }
});

const tasksModel = mongoose.model('tasks', tasksSchema);

module.exports = tasksModel;