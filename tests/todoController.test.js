const supertest = require('supertest');
const app = require('../server');
// Link to your server file
const request = supertest(app);

describe('Get all Tasks', () => {
  // Test will pass if we get all todos
  it('Should return the Tasks as response', async (done) => {
    const response = await request.get('/api/task');

    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.status).toBeTruthy();
    expect(response.body.tasksCount).toBeDefined();
    if (response.body.tasksCount > 0) {
      expect(response.body.task).toBeTruthy();
    }
    done();
  });
});
