#!/usr/bin/env node

'use strict';

const exec = require('child_process').execSync;
const argv = require('minimist')(process.argv.slice(2));
const build = require('./index.js');

build(argv._[0]);
const results = exec('npm run build', {
  cwd: __dirname
});

console.log(results + '');