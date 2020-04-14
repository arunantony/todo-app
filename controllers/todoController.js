/* eslint-disable consistent-return */
const tasks = require('../models/tasks.js');

// Create post task
exports.todo_task_post = (req, res, next) => {
  const reqObj = req.body;
  const name = reqObj.name ? reqObj.name : null;
  const status = reqObj.status ? reqObj.status : null;

  if (name === null || status === null) {
    return res.status(400).json({ status: false, message: 'Missing parameters' });
  }

  tasks.createTask(reqObj)
    .then((doc) => res.status(201).json({ status: true, message: 'Task created successfullly', taskId: doc.id }))
    .catch((err) => {
      next(err);
    });
};

// Read Task
exports.todo_task_get = (req, res, next) => {
  tasks.readTask()
    .then((data) => {
      const tasksCount = data.length;
      if (tasksCount === 0) {
        res.status(200).json({ status: true, message: 'Tasks empty', tasksCount });
      } else {
        res.status(200).json({
          status: true, message: 'Task read successfully', tasksCount, task: data,
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

// Update Task
exports.todo_task_put = (req, res, next) => {
  const reqObj = req.body;

  const taskId = req.params.taskId ? req.params.taskId : null;
  const name = reqObj.name ? reqObj.name : null;
  const status = reqObj.status ? reqObj.status : null;

  if (taskId === null || name === null || status === null) {
    return res.status(400).json({ status: false, message: 'Missing parameters' });
  }

  reqObj.taskId = taskId;
  tasks.updateTask(reqObj)
    .then((docs) => {
      if (docs.nModified === 1) {
        res.status(200).json({ status: true, message: 'Task updated successfullly' });
      } else {
        res.status(404).json({ status: false, message: 'Got invalid credentials. Task update failed.' });
      }
    })
    .catch((err) => {
      next(err);
    });
};

// Delete task
exports.todo_task_delete = (req, res, next) => {
  const taskId = req.params.taskId ? req.params.taskId : null;

  if (taskId === null) {
    return res.status(400).json({ status: false, message: 'Missing parameters' });
  }

  const data = { taskId };
  tasks.deleteTask(data)
    .then((docs) => {
      if (docs.deletedCount === 1) {
        res.status(200).json({ status: true, message: 'Task deleted successfullly' });
      } else {
        res.status(404).json({ status: false, message: 'Got invalid credentials. Task delete failed.' });
      }
    })
    .catch((err) => {
      next(err);
    });
};
