import { pool } from '../dbConfig/db';

// Define the test suite
describe('Database Connection', () => {
  // Define an individual test case
  it('should connect to the database successfully', (done) => {
    pool.query('SELECT NOW()', (err, res) => {
      // Handle errors
      if (err) {
        expect(err).toBeNull(); // Fail the test if there's an error
      } else {
        expect(res.rows[0]).toBeDefined(); // Pass the test if there's a successful response
      }
      done(); // Signal Jasmine that the asynchronous test is complete
    });
  });
});
