'use strict';

export default class Context {
  /**
   * @constructor
   */
  constructor(gateway, options) {
    this.gateway = gateway;
    this.options = options;
    this.storage = this.options.storage || window.localStorage;
  }
}

