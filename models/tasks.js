'use strict';

const tasksModel = require('../database').models.tasks;

// Create task
const createTask = (data) => {
    return new Promise((resolve, reject) => {
        let newTasksModel = new tasksModel();
        newTasksModel.name = data.name;
        newTasksModel.status = data.status;
        newTasksModel.save(err => {
            if (err) return reject(err);
            else return resolve();
        });
    })
};

// Read task
const readTask = () => {
    return new Promise((resolve, reject) => {
        tasksModel.find({})
            .then((data) => {
                return resolve(data);
            })
            .catch((err) => {
                return reject(err);
            })
    })
}

// Update task
const updateTask = (data) => {
    return new Promise((resolve, reject) => {
        tasksModel.updateOne({_id:data.taskId}, {$set:{name:data.name,status:data.status}})
            .then((docs) => {
                return resolve(docs);
            })
            .catch((err) => {
                return reject(err);
            })
    })
}

// Delete task
const deleteTask = (data) => {
    return new Promise((resolve, reject) => {
        tasksModel.deleteOne({_id: data.taskId})
            .then((docs) => {
                return resolve(docs);
            })
            .catch((err) => {
                return reject(err);
            })
    })
}

module.exports = {
    createTask,
    readTask,
    updateTask,
    deleteTask
}