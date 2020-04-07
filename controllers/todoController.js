/* eslint-disable consistent-return */
const tasks = require('../models/tasks.js');

// Create get testGet
exports.todo_testGet_get = (req, res) => {
  res.json({ status: 'success', message: 'message from todo_testGet_get' });
};

// Create post task
exports.todo_task_post = (req, res) => {
  const reqObj = req.body;
  const name = reqObj.name ? reqObj.name : null;
  const status = reqObj.status ? reqObj.status : null;

  if (name === null || status === null) {
    return res.json({ status: 'error', message: 'Missing parameters' });
  }

  tasks.createTask(reqObj)
    .then(() => res.json({ status: 'success', message: 'Task created successfullly' }))
    .catch((err) => {
      console.log(err);
      return res.json({ status: 'error', message: 'Task creation failed' });
    });
};

// Read Task
exports.todo_task_get = (req, res) => {
  tasks.readTask()
    .then((data) => {
      const tasksCount = data.length;
      if (tasksCount === 0) { res.json({ status: 'success', message: 'Tasks empty', tasksCount }); } else {
        res.json({
          status: 'success', message: 'Task read successfully', tasksCount, task: data,
        });
      }
    })
    .catch((err) => {
      res.json({ status: 'error', message: 'Task read failed' });
      console.log(err);
    });
};

// Update Task
exports.todo_task_put = (req, res) => {
  const reqObj = req.body;

  const taskId = req.params.taskId ? req.params.taskId : null;
  const name = reqObj.name ? reqObj.name : null;
  const status = reqObj.status ? reqObj.status : null;

  if (taskId === null || name === null || status === null) {
    return res.json({ status: 'error', message: 'Missing parameters' });
  }

  reqObj.taskId = taskId;
  tasks.updateTask(reqObj)
    .then((docs) => {
      if (docs.nModified === 1) { res.json({ status: 'success', message: 'Task updated successfullly' }); } else { res.json({ status: 'error', message: 'Got invalid credentials. Task update failed.' }); }
    })
    .catch((err) => {
      res.json({ status: 'error', message: 'Task update failed' });
      console.log(err);
    });
};

// Delete task
exports.todo_task_delete = (req, res) => {
  const taskId = req.params.taskId ? req.params.taskId : null;

  if (taskId === null) {
    return res.json({ status: 'error', message: 'Missing parameters' });
  }

  const data = { taskId };
  tasks.deleteTask(data)
    .then((docs) => {
      console.log('docs, ', docs);
      if (docs.deletedCount === 1) { res.json({ status: 'success', message: 'Task deleted successfullly' }); } else { res.json({ status: 'error', message: 'Got invalid credentials. Task delete failed.' }); }
    })
    .catch((err) => {
      res.json({ status: 'error', message: 'Task deleted failed' });
      console.log(err);
    });
};
