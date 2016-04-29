#!/usr/bin/env node

'use strict';

const argv = require('minimist')(process.argv.slice(2));
const build = require('./index.js');

build(argv._[0]);

