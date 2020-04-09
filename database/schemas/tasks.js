const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * @swagger
 * definitions:
 *   Tasks:
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       status:
 *         type: string
 */

const tasksSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
});

const tasksModel = mongoose.model('tasks', tasksSchema);

module.exports = tasksModel;
