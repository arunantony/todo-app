/* eslint-disable consistent-return */
const supertest = require('supertest');
const app = require('../server');

// Link to your server file
const request = supertest(app);
const { mongoose } = require('../database');

afterAll(() => {
  // Disconnect the MongoDb
  mongoose.disconnect();
});

describe('Create Task', () => {
  // Test will pass if we create a Task
  it('Should create a Task', async () => {
    const response = await request.post('/api/task')
      .send({ name: 'Test Task 001', status: 'To Do' })
      .set('Accept', 'application/json');

    expect(response.body.status).toBeTruthy();
    expect(response.body.message).toBeDefined();
  });

  // Test will pass if we get response status as false,
  // on providing invalid input
  it('Should fail on invalid input', async () => {
    const response = await request.post('/api/task')
      .send({ task: 'This is an invalid input' })
      .set('Accept', 'application/json');

    expect(response.body.status).toBeFalsy();
    expect(response.body.message).toBeDefined();
  });

  // Test will pass if we get response status as false,
  // on providing no input
  it('Should fail on no input', async () => {
    const response = await request.post('/api/task')
      .set('Accept', 'application/json');

    expect(response.body.status).toBeFalsy();
    expect(response.body.message).toBeDefined();
  });
});

describe('Get all Tasks', () => {
  // Test will pass if we get all task
  it('Should return the Tasks as response', async () => {
    const response = await request.get('/api/task');

    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.status).toBeTruthy();
    expect(response.body.tasksCount).toBeDefined();
    if (response.body.tasksCount > 0) {
      expect(response.body.task).toBeTruthy();
    }
  });
});

describe('Update Task', () => {
  let newTaskId;
  // The test will pass if can update a task
  it('Should update a task', async () => {
    // Create a new task
    const createTaskResp = await request.post('/api/task')
      .send({ name: 'Test Task 002', status: 'To Do' })
      .set('Accept', 'application/json');

    expect(createTaskResp.body.status).toBeTruthy();
    expect(createTaskResp.body.message).toBeDefined();
    expect(createTaskResp.body).toHaveProperty('taskId');

    newTaskId = createTaskResp.body.taskId;

    // Update the new task
    const updateTaskResp = await request.put(`/api/task/${newTaskId}`)
      .send({ name: 'Test Task 002', status: 'Done' })
      .set('Accept', 'application/json');

    expect(updateTaskResp.body.status).toBeTruthy();
    expect(createTaskResp.body.message).toBeDefined();
  });

  // Test will pass if we get response status as false,
  // on providing invalid input
  it('Should fail on invalid input', async () => {
    const response = await request.put(`/api/task/${newTaskId}`)
      .send({ task: 'This is an invalid input' })
      .set('Accept', 'application/json');

    expect(response.body.status).toBeFalsy();
    expect(response.body.message).toBeDefined();
  });

  // Test will pass if we get response status as false,
  // on providing no input
  it('Should fail on no input', async () => {
    const response = await request.put(`/api/task/${newTaskId}`)
      .set('Accept', 'application/json');

    expect(response.body.status).toBeFalsy();
    expect(response.body.message).toBeDefined();
  });
});

describe('Delete task', () => {
  let newTaskId;
  // The test will pass if can delete a task
  it('Should delete a task', async () => {
    // Create a new task
    const createTaskResp = await request.post('/api/task')
      .send({ name: 'Test Task 003', status: 'To Do' })
      .set('Accept', 'application/json');

    expect(createTaskResp.body.status).toBeTruthy();
    expect(createTaskResp.body.message).toBeDefined();
    expect(createTaskResp.body).toHaveProperty('taskId');

    newTaskId = createTaskResp.body.taskId;

    // Delete the new task
    const updateTaskResp = await request.delete(`/api/task/${newTaskId}`)
      .set('Accept', 'application/json');

    expect(updateTaskResp.body.status).toBeTruthy();
    expect(createTaskResp.body.message).toBeDefined();
  });

  // Test will pass if we get response status as false,
  // on providing invalid input
  it('Should fail on invalid input', async () => {
    const invalidId = 'abcdefghijkl';
    const response = await request.delete(`/api/task/${invalidId}`)
      .set('Accept', 'application/json');

    expect(response.body.status).toBeFalsy();
    expect(response.body.message).toBeDefined();
  });
});
