const express = require('express');
const router = express.Router();

// Require controller modules.
const todo_controller = require('../controllers/todoController');

// Handle the API Roor request
router.all('/',(req, res)=> {
    res.send('api root has no operation');
});

///------------------------------ TODO CONTROLLER ROUTES -------------------------------------///

/* GET request to test get request in todoController */
router.get('/testGet',todo_controller.todo_testGet_get);

/* POST request to test Create new task */ /* -- CREATE -- */
router.post('/task',todo_controller.todo_task_post);

/* GET request to fetch task list */ /* -- READ -- */
router.get('/task',todo_controller.todo_task_get);

/* PUT request to update task */ /* -- UPDATE -- */
router.put('/task/:taskId',todo_controller.todo_task_put);

/* DELETE request to delete task */ /* -- DELETE -- */
router.delete('/task/:taskId',todo_controller.todo_task_delete);

module.exports=router;