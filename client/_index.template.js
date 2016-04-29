'use strict';

import Context from './context';
<% models.forEach(function(m) { %>
  import <%= m.name %> from './rest.<%= m.name.toLowerCase() %>.js';
<% }) %>

export default function(gateway) {
  let app = {
    models: {},
    middlewares: {},
  };
  let context = new Context(gateway);
  
  <% models.forEach(function(m) { %>
    app.models.<%= m.name %> = new <%= m.name %>(context);
  <% }) %>

  <% middlewares.forEach(function(m) { %>
    (function() {
      async function fetch(data) {
        const response = await fetch('<%= m.path %>', {
          method: '<%= m.method %>',
          headers: Object.assign({
            'Authorization': await context.getAccessToken()
          }, commonHeaders),
          body: data
        });
        return await context.handleRespAndReturn(response);
      }
      <% if (!m.scope) { %>
        app.middlewares.<%= m.name %> = fetch;
      <% } else { %>
        app.middlewares.<%= m.name %> = app.middlewares.<%= m.name %> || {};
        app.middlewares.<%= m.name %>['<%= m.scope %>'] = fetch;
      <% } %>
    })();
  <% }); %>

  return app;
}
