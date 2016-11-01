#!/usr/bin/env node

/* global exec, mkdir */

var config = require('./config')
var fetchData = require('./lib/fetch-data')
var path = require('path')
var program = require('commander')

require('shelljs/global')

function tokenizeAndBuildMap (options) {
  exec(config.apps.tokenize + options.verbose + ' "' + options.base + '.json" > "' + options.base + '.tokenized.json"')

  exec(config.apps.buildNnMapping + options.verbose + options.properties + ' mapping "' + options.base + '.tokenized.json" > "' + options.base + '.mapping.json"')
  exec(config.apps.buildNnMapping + options.verbose + options.properties + ' model "' + options.base + '.tokenized.json" > "' + options.base + '.modelio.json"')
}

function createMapping () {
  var options = {}

  options.target = '*'
  options.output = program.output || 'tmp'
  options.key = 'tokens'
  options.base = path.join(options.output, options.key)
  options.verbose = program.verbose
  options.verbose = options.verbose ? ' --verbose' : ''
  options.properties = program.properties ? ' --properties=' + program.properties : ''

  mkdir('-p', options.output)

  fetchData(options)
  tokenizeAndBuildMap(options)
}

program
  .usage('[options] <target>')
  .option('-v, --verbose', 'verbose output')
  .option('-o, --output <path>', 'output folder')
  .option('-p, --properties <n>', 'list of output properties as comma separated list')

program.parse(process.argv)

createMapping()
