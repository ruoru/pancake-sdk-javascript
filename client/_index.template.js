'use strict';

import Context from './context';
<% models.forEach(function(m) { %>
  import <%= m.name %> from './rest.<%= m.plural %>.js';
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
  return app;
}
