'use strict';

const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const glob = require('glob').sync;

const REST_TEMPLATE_JS = fs.readFileSync(
  path.join(__dirname, './client/_rest.template.js'), 'utf8');
const INDEX_TEMPLATE_JS = fs.readFileSync(
  path.join(__dirname, './client/_index.template.js'), 'utf8');
const CTX_TEMPLATE_JS = fs.readFileSync(
  path.join(__dirname, './client/_context.template.js'), 'utf8');

function loadModels(config) {
  const patterns = config._meta.sources.map((s) => {
    return path.join(process.cwd(), s + '/*.json');
  });
  return patterns.reduce((models, pattern) => {
    return models.concat(
      glob(pattern).map(p => require(p))
    );
  }, []);
}

module.exports = function(root) {
  let cwd = process.cwd();
  cwd = path.join(cwd, root);
  process.chdir(cwd);

  const config = require(path.join(cwd, './config.json'));
  const modelConfig = require(path.join(cwd, '/model-config.json'));
  const middlewares = require(path.join(cwd, '/middleware.json'));
  const models = loadModels(modelConfig);
  
  const results = models.filter((m) => {
    const conf = modelConfig[m.name];
    return conf && conf.public;
  })
  .map((m) => {
    const source = ejs.render(REST_TEMPLATE_JS, {
      model: m,
      config: config
    });
    fs.writeFileSync(
      path.join(__dirname, `./build/rest.${m.name.toLowerCase()}.js`), source);
    return m
  });

  // build index
  const indexSource = ejs.render(INDEX_TEMPLATE_JS, {
    models: results
  });
  fs.writeFileSync(path.join(__dirname, './build/index.js'), indexSource);

  // build context
  const ctxSource = ejs.render(CTX_TEMPLATE_JS, {});
  fs.writeFileSync(path.join(__dirname, './build/context.js'), ctxSource);
};

