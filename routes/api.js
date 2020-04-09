const express = require('express');

const router = express.Router();

// Require controller modules.
const todoController = require('../controllers/todoController');

// Handle the API Roor request
router.all('/', (req, res) => {
  res.send('api root has no operation');
});

// /------------------------------ TODO CONTROLLER ROUTES -------------------------------------/ //

/**
 * @swagger
 * /api/testGet:
 *   get:
 *     tags:
 *       - Task
 *     description: Tests a get request
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A success message
 */
/* GET request to test get request in todoController */
router.get('/testGet', todoController.todo_testGet_get);

/**
 * @swagger
 * /api/task:
 *   post:
 *     tags:
 *       - Task
 *     description: Create a task
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A success message having the task id
 *     parameters:
 *       - name: "name"
 *         in: "formData"
 *         description: "Task Name"
 *         required: true
 *         type: "string"
 *       - name: "status"
 *         in: "formData"
 *         description: "Status of the task"
 *         required: true
 *         type: "string"
 */
/* POST request to test Create new task */ /* -- CREATE -- */
router.post('/task', todoController.todo_task_post);


/**
 * @swagger
 * /api/task:
 *   get:
 *     tags:
 *       - Task
 *     description: Read all the tasks
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A success message having array of task
 */
/* GET request to fetch task list */ /* -- READ -- */
router.get('/task', todoController.todo_task_get);

/**
 * @swagger
 * /api/task/{taskId}:
 *   put:
 *     tags:
 *       - Task
 *     description: Read all the tasks
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "taskId"
 *         in: "path"
 *         description: "Associated id of the task that need to be updated"
 *         required: true
 *         type: "string"
 *       - name: "name"
 *         in: "formData"
 *         description: "Task Name"
 *         required: true
 *         type: "string"
 *       - name: "status"
 *         in: "formData"
 *         description: "Status of the task"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: A success message
 */
/* PUT request to update task */ /* -- UPDATE -- */
router.put('/task/:taskId', todoController.todo_task_put);

/**
 * @swagger
 * /api/task/{taskId}:
 *   delete:
 *     tags:
 *       - Task
 *     description: Delete a task
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "taskId"
 *         in: "path"
 *         description: "Associated id of the task that need to be updated"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: A success message
 */
/* DELETE request to delete task */ /* -- DELETE -- */
router.delete('/task/:taskId', todoController.todo_task_delete);

module.exports = router;
