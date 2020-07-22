const clusterClass = require('cluster');
const ParamsCluster = require('./params-cluster');

/**
 * Config cluster queue
 */
class Cluster {
  /**
   * @param {Cluster} cluster
   * @param {params-cluster} paramsCluster
   * @return {void}
   */
  constructor(cluster = null, paramsCluster = null) {
    if (paramsCluster == null) {
      paramsCluster = new ParamsCluster();
    }

    this.workersNumber = paramsCluster.workersNumber;

    this.cluster = cluster;
    if (cluster == null) {
      this.cluster = clusterClass;
    }
  }

  /**
   * @return {integer}
   */
  get workerId() {
    const {worker} = this.cluster;

    return worker ? worker.id : 1;
  }

  /**
   * @return {boolean}
   */
  shouldStart() {
    return this.cluster.isMaster && this.workersNumber > 1;
  }

  /**
   * @return {void}
   */
  start() {
    for (let i = 0; i < this.workersNumber; i++) {
      this.cluster.fork();
    }
  }
}

module.exports = Cluster;
