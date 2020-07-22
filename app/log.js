/**
 * Log class exporter
 */
class Log {
  /**
   * @param {Moment} moment
   * @param {object} colors
   * @param {boolean} debugMode
   * @return {void}
   */
  constructor(moment, colors, debugMode) {
    this.moment = moment;
    this.colors = colors;
    this.debugMode = debugMode;
  }

  /**
   * @param {object} color
   * @param {string} message
   * @return {boolean}
   */
  show(color, message) {
    console.log(
        this.colors[color],
        `${this.moment.format('YYYY-MM-DD H:mm:ss')} - ${message}`,
    );
    return true;
  }

  /**
   * @param {string} content
   * @return {boolean}
   */
  debug(content) {
    if (this.debugMode !== 0) {
      console.log(
          content,
      );
      return true;
    }
    return false;
  }
}

module.exports = Log;
