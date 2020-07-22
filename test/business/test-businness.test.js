test('test businness job example', async () => {
  const job = {
    id: 1,
    data: true,
  };

  jest.mock('../../app/log.js');
  const log = require('../../app/log.js');

  log.show = jest.fn();
  log.debug = jest.fn();

  const business = new (require('../../business/test-business'));
  const businessProcess = await business.process(job, log, 1);

  expect(log.show).toHaveBeenCalledTimes(2);
  expect(log.show).toHaveBeenCalledWith('yellow', `Worker: 1 - 1 - Start job`);
  expect(log.show).toHaveBeenCalledWith('yellow', `Worker: 1 - 1 - Finish job`);

  expect(log.debug).toHaveBeenCalledTimes(1);
  expect(log.debug).toHaveBeenCalledWith(job.data);

  expect(businessProcess).toBeUndefined();
});

