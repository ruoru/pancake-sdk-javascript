'use strict';

export default class Context {
  /**
   * @constructor
   */
  constructor(gateway, options) {
    this.gateway = 'http://' + gateway + '.getweflex.com';
    this.options = options;
    this.storage = this.options.storage || window.localStorage;
  }
  /**
   * @method handleRespAndReturn
   */
  async handleRespAndReturn(response) {
    const body = await response.json();
    if (response.status === 401) {
      this.onAuthFail(body.error);
    } else if (!response || response >= 400) {
      let err = new Error(body.error.message);
      err.status = err.statusCode = response.status;
      throw err;
    }
  }
  /**
   * @method getAccessToken
   */
  async getAccessToken() {
    return await this.storage.getItem('weflex.access_token');
  }
  /**
   * @method getUserId
   */
  async getUserId() {
    return await this.storage.getItem('weflex.user_id');
  }
}

