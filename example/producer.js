const Bull = require('bull');
const Ulid = require('ulid');

const queue = new Bull('test');

(async () => {
  await queue.add(
      'process',
      {
        field: 'data',
        another_field: 123,
      },
      {
        removeOnComplete: 100,
        attempts: 1,
        backoff: 1000,
        jobId: Ulid.ulid(),
      },
  );
  queue.close();
  console.log('single job');
  process.exit();
})();
