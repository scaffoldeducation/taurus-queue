test('test log show', () => {
  jest.mock('moment');
  const Moment = require('moment');
  const moment = new Moment();
  moment.format = jest.fn();

  const colors = require('../../app/colors.js');

  const Log = require('../../app/log.js');
  const log = new Log(moment, colors, 0);

  const result = log.show('red', 'test');
  expect(moment.format).toHaveBeenCalledTimes(1);
  expect(result).toBe(true);
});

test('test log debug disabled', () => {
  jest.mock('moment');
  const Moment = require('moment');

  const colors = require('../../app/colors.js');

  const Log = require('../../app/log.js');
  const log = new Log(Moment, colors, 0);
  const result = log.debug('test');

  expect(result).toBe(false);
});

test('test log debug enable', () => {
  jest.mock('moment');
  const Moment = require('moment');

  const colors = require('../../app/colors.js');

  const Log = require('../../app/log.js');
  const log = new Log(Moment, colors, 1);
  const result = log.debug('test');

  expect(result).toBe(true);
});
