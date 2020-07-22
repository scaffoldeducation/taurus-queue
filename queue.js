require('dotenv').config();

const Moment = require('moment');
const Log = require('./app/log.js');
const Queue = require('./core/queue');
const Validate = require('./app/validate');

const colors = require('./app/colors.js');
const configQueue = require('./config/queue');
const ParamsQueue = require('./core/params-queue');

const params = new ParamsQueue();
const moment = new Moment();

const log = new Log(
    moment,
    colors,
    params.debugMode,
);

const validate = new Validate(log, params.queueName);

let constructors = {};
let queue = null;
let queueName = '';

const validations = [
  validate.isValidQueueName(),
  validate.hasBusinessInConstructor(),
  validate.hasBusinessFile(),
];

const workerId = 1;

log.debug(
    'Running on debug mode :)>>',
);
log.show(
    'bright',
    'Starting Taurus Queue...',
);

Promise
    .all(validations)
    .then(() => {
      queueName = validate.queueName;
      queue = new Queue(
          queueName,
          configQueue,
          log,
          workerId,
      );

      log.show(
          'yellow',
          `Active queue: ${queueName}`,
      );

      constructors = validate.constructors;
    }).then(() => {
      const business = new constructors[queueName]();
      queue.process(
          'process',
          async (job) => {
            business.process(
                job,
                log,
                workerId,
            );
          },
      );
    });
