test('test is valid queue name', () => {
  jest.mock('../../app/log.js');
  const Log = require('../../app/log.js');
  const log = new Log();
  log.show = jest.fn();

  const Validate = require('../../app/validate.js');
  validate = new Validate(log, 'test');

  validate.isValidQueueName();

  expect(log.show).toHaveBeenCalledTimes(0);
});

test('test is invalid queue name', () => {
  jest.mock('../../app/log.js');
  const Log = require('../../app/log.js');
  const log = new Log();
  log.show = jest.fn();

  process.exit = jest.fn();

  const Validate = require('../../app/validate.js');
  validate = new Validate(log, '');

  validate.isValidQueueName();

  expect(log.show).toHaveBeenCalledTimes(1);
  expect(log.show).toHaveBeenCalledWith(
      'red',
      'Unable to start: Empty queue name',
  );
});

test('test is undefined string value', () => {
  jest.mock('../../app/log.js');
  const Log = require('../../app/log.js');
  const log = new Log();
  log.show = jest.fn();

  process.exit = jest.fn();

  const Validate = require('../../app/validate.js');
  validate = new Validate(log, 'undefined');

  validate.isValidQueueName();

  expect(log.show).toHaveBeenCalledTimes(1);
  expect(log.show).toHaveBeenCalledWith(
      'red',
      'Unable to start: Missing queue name',
  );
});

test('test has business in constructor', () => {
  jest.mock('../../app/log.js');
  const Log = require('../../app/log.js');
  const log = new Log();
  log.show = jest.fn();

  process.exit = jest.fn();

  const Validate = require('../../app/validate.js');
  validate = new Validate(log, 'test');
  validate.hasBusinessInConstructor();

  expect(log.show).toHaveBeenCalledTimes(0);
});

test('test not has business in constructor', () => {
  jest.mock('../../app/log.js');
  const Log = require('../../app/log.js');
  const log = new Log();
  log.show = jest.fn();

  process.exit = jest.fn();

  const queueName = 'test2';

  const Validate = require('../../app/validate.js');
  validate = new Validate(log, queueName);
  validate.hasBusinessInConstructor();

  expect(log.show).toHaveBeenCalledTimes(1);
  expect(log.show).toHaveBeenCalledWith(
      'red',
      `Unable to start: Missing ${queueName} business in constructors`,
  );
});

test('test has business file', () => {
  jest.mock('../../app/log.js');
  const Log = require('../../app/log.js');
  const log = new Log();
  log.show = jest.fn();

  process.exit = jest.fn();

  const Validate = require('../../app/validate.js');
  validate = new Validate(log, 'test');
  validate.hasBusinessFile();

  expect(log.show).toHaveBeenCalledTimes(0);
});

test('test has business file', () => {
  jest.mock('../../app/log.js');
  const Log = require('../../app/log.js');
  const log = new Log();
  log.show = jest.fn();

  process.exit = jest.fn();

  const queueName = 'test2';

  const Validate = require('../../app/validate.js');
  validate = new Validate(log, queueName);
  validate.hasBusinessFile();

  expect(log.show).toHaveBeenCalledTimes(1);
  expect(log.show).toHaveBeenCalledWith(
      'red',
      `Missing ./business/${queueName}-business.js file`,
  );
});
