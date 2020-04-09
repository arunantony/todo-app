const TasksModel = require('../database').models.tasks;

// Create task
const createTask = (data) => new Promise((resolve, reject) => {
  const newTasksModel = new TasksModel();
  newTasksModel.name = data.name;
  newTasksModel.status = data.status;
  newTasksModel.save((err, doc) => {
    if (err) return reject(err);
    return resolve(doc);
  });
});

// Read task
const readTask = () => new Promise((resolve, reject) => {
  TasksModel.find({})
    .then((data) => resolve(data))
    .catch((err) => reject(err));
});

// Update task
const updateTask = (data) => new Promise((resolve, reject) => {
  TasksModel.updateOne({ _id: data.taskId }, { $set: { name: data.name, status: data.status } })
    .then((docs) => resolve(docs))
    .catch((err) => reject(err));
});

// Delete task
const deleteTask = (data) => new Promise((resolve, reject) => {
  TasksModel.deleteOne({ _id: data.taskId })
    .then((docs) => resolve(docs))
    .catch((err) => reject(err));
});

module.exports = {
  createTask,
  readTask,
  updateTask,
  deleteTask,
};
