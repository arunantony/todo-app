const express = require('express');

const router = express.Router();

// Require controller modules.
const todoController = require('../controllers/todoController');

// Handle the API Root request
router.all('/', (req, res) => {
  res.send('api root has no operation');
});

// /------------------------------ TODO CONTROLLER ROUTES -------------------------------------/ //

/* POST request to test Create new task */ /* -- CREATE -- */
router.post('/task', todoController.todo_task_post);

/* GET request to fetch task list */ /* -- READ -- */
router.get('/task', todoController.todo_task_get);

/* PUT request to update task */ /* -- UPDATE -- */
router.put('/task/:taskId', todoController.todo_task_put);

/* DELETE request to delete task */ /* -- DELETE -- */
router.delete('/task/:taskId', todoController.todo_task_delete);

module.exports = router;
