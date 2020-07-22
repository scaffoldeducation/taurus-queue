const constructors = require('../config/constructor');
const fs = require('fs');

/**
 * Validate project structure
 */
class Validate {
  /**
   * @param {Log} log Class Log
   * @param {string} queueName
   * @return {void}
   */
  constructor(log, queueName) {
    this.constructors = constructors;
    this.queueName = queueName;
    this.log = log;
  }

  /**
   * @return {void}
   */
  isValidQueueName() {
    if (typeof this.queueName == 'string' && !this.queueName.trim()) {
      this.log.show(
          'red',
          'Unable to start: Empty queue name',
      );
      process.exit(1);
    }
    if (this.queueName == 'undefined') {
      this.log.show(
          'red',
          'Unable to start: Missing queue name',
      );
      process.exit(1);
    }
  }

  /**
   * @return {void}
   */
  hasBusinessInConstructor() {
    if (!(this.queueName in constructors)) {
      this.log.show(
          'red',
          `Unable to start: Missing ${this.queueName} business in constructors`,
      );
      process.exit(1);
    }
  }

  /**
   * @return {void}
   */
  hasBusinessFile() {
    const path = `./business/${this.queueName}-business.js`;
    if (!fs.existsSync(path)) {
      this.log.show(
          'red',
          `Missing ./business/${this.queueName}-business.js file`,
      );
      process.exit(1);
    }
  }
}

module.exports = Validate;
