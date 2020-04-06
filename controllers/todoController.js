const tasks = require('../models/tasks.js');

// Create get testGet
exports.todo_testGet_get = (req, res, next) => {
    res.json({ "status": "success", "message": "message from todo_testGet_get" });
};

// Create post task
exports.todo_task_post = (req, res, next) => {
    const reqObj = req.body;
    let name, status;
    reqObj.name ? { name } = reqObj : name = null;
    reqObj.status ? { status } = reqObj : status = null;

    if(name === null || status === null){
        return res.json({ "status": "error", "message": "Missing parameters" });
    }

    tasks.createTask(reqObj)
    .then(()=>{
        res.json({ "status": "success", "message": "Task created successfullly" });
    })
    .catch(err=>{
        res.json({ "status": "error", "message": "Task creation failed" });
        console.log(err);
    })
};

// Read Task
exports.todo_task_get = (req, res, next) => {
    tasks.readTask()
    .then((data)=>{
        const tasksCount = data.length;
        if ( tasksCount === 0)
        res.json({ "status": "success", "message": "Tasks empty", tasksCount });
        else
        res.json({ "status": "success", "message": "Task read successfully", tasksCount, "task" : data });
    })
    .catch(err=>{
        res.json({ "status": "error", "message": "Task read failed" });
        console.log(err);
    })
};

// Update Task
exports.todo_task_put = (req, res, next) => {

    const reqObj = req.body;
    let name, status, taskId;;

    req.params.taskId ? taskId = req.params.taskId : taskId = null;
    reqObj.name ? { name } = reqObj : name = null;
    reqObj.status ? { status } = reqObj : status = null;

    if(taskId === null || name === null || status === null){
        return res.json({ "status": "error", "message": "Missing parameters" });
    }

    reqObj["taskId"] = taskId;
    tasks.updateTask(reqObj)
    .then((docs)=>{
        if(docs.nModified === 1)
        res.json({ "status": "success", "message": "Task updated successfullly" });
        else
        res.json({ "status": "error", "message": "Got invalid credentials. Task update failed." });
    })
    .catch(err=>{
        res.json({ "status": "error", "message": "Task update failed" });
        console.log(err);
    })
};

// Delete task
exports.todo_task_delete = (req, res, next) => {

    let taskId;;

    req.params.taskId ? taskId = req.params.taskId : taskId = null;

    if(taskId === null){
        return res.json({ "status": "error", "message": "Missing parameters" });
    }

    const data = {taskId}
    tasks.deleteTask(data)
    .then((docs)=>{
        console.log('docs, ',docs);
        if(docs.deletedCount === 1)
        res.json({ "status": "success", "message": "Task deleted successfullly" });
        else
        res.json({ "status": "error", "message": "Got invalid credentials. Task delete failed." });
    })
    .catch(err=>{
        res.json({ "status": "error", "message": "Task deleted failed" });
        console.log(err);
    })
};
