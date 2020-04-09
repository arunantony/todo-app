const mongoose = require('mongoose');

const { Schema } = mongoose;

const tasksSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
});

const tasksModel = mongoose.model('tasks', tasksSchema);

module.exports = tasksModel;
