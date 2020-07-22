const Bull = require('bull');

/**
 * Config queue listening
 */
class Queue {
  /**
   * @param {string} queueName
   * @param {object} configQueue
   * @param {Log} log
   * @param {intenger} workerId
   * @return {void}
   */
  constructor(
      queueName,
      configQueue,
      log,
      workerId,
  ) {
    const options = {
      redis: {
        host: configQueue.redisHost,
        port: configQueue.redisPort,
        maxRetriesPerRequest: configQueue.redisMaxRetriesPerRequest,
        enableReadyCheck: configQueue.redisEnableReadyCheck,
      },
    };
    const queue = new Bull(
        queueName,
        options,
    );

    queue.on('error', (error) => {
      log.show(
          'red',
          `Worker: ${workerId} - Queue ${queue.name} - error: ${error}`,
      );

      log.debug(
          error,
      );
    });

    queue.on('failed', (job, error) => {
      const message = `
        Worker: ${workerId} - 
        Queue ${queue.name} - 
        Job ${job.id}
        failed: ${error}`;

      log.show(
          'red',
          message,
      );

      log.debug(
          error,
      );
    });

    return queue;
  }
}

module.exports = Queue;
