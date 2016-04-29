'use strict';

/**
 * @module models
 */

const commonHeaders = {
  'Accept': 'text/json, text/xml',
  'Content-Type': 'application/json'
};

/**
 * <%= model.description %>
 * @class <%= model.name %>
 */
export default class <%= model.name %> {
  constructor(context) {
    this.context = context;
    this.url = context.gateway + '<%= config.restApiRoot %>/<%= model.plural.toLowerCase() %>';
  }
  /**
   * @method create
   * @async
   * @param {<%= model.name%>} data - the data for <%= model.name %>
   */
  async create(data) {
    const response = await fetch(this.url, {
      method: 'post',
      headers: Object.assign({
        'Authorization': this.context.accessToken
      }, commonHeaders),
      body: data
    });
    return await this.context.handleRespAndReturn(response);
  }
  /**
   * @method update
   * @async
   * @param {String} id - the id to search <%= model.name %> instance
   * @param {Object} data - the data
   */
  async update(id, data) {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'put',
      headers: Object.assign({
        'Authorization': this.context.accessToken
      }, commonHeaders),
      body: data
    });
    return await this.context.handleRespAndReturn(response);
  }
  /**
   * @method get
   * @async
   * @param {String} id - the id to search <%= model.name %> instance
   * @param {Object} filter - the filter
   * @param {Object} filter.where - the where filter
   * @param {Object} filter.include - the include filter
   */
  async get(id, filter) {
    const url = `${this.url}/${id}?filter=` + encodeURI(JSON.stringify(filter));
    const response = await fetch(url, {
      method: 'get',
      headers: Object.assign({
        'Authorization': this.context.accessToken
      }, commonHeaders)
    });
    return await this.context.handleRespAndReturn(response);
  }
}

