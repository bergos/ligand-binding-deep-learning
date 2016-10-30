#!/usr/bin/env node

/* global exec, mkdir */

var config = require('./config')
var fetchData = require('./lib/fetch-data')
var path = require('path')
var program = require('commander')

require('shelljs/global')

function testData (options) {
  exec(config.apps.split + options.verbose + ' --sort --offset=0 --limit=5 "' + options.base + '.json" > "' + options.base + '.test1.json"')
  exec(config.apps.split + options.verbose + ' --sort --offset=0.5 --limit=5 "' + options.base + '.json" > "' + options.base + '.test2.json"')
  exec(config.apps.split + options.verbose + ' --sort --offset=-5 --limit=5 "' + options.base + '.json" > "' + options.base + '.test3.json"')

  exec(config.apps.merge + options.verbose + ' "' + options.base + '.test1.json" "' + options.base + '.test2.json" "' + options.base + '.test3.json" > "' + options.base + '.test.json"')

  exec('rm ' + options.base + '.test1.json ' + options.base + '.test2.json ' + options.base + '.test3.json')

  if (options.alternatives) {
    exec(config.apps.alternative + options.verbose + ' --alternatives=' + options.alternatives + ' "' + options.base + '.test.json" > "' + options.base + '.test.alternatives.json"')
    exec(config.apps.merge + options.verbose + ' "' + options.base + '.test.json" "' + options.base + '.test.alternatives.json" > "' + options.base + '.test.all.json"')
  } else {
    exec('cp "' + options.base + '.test.json" "' + options.base + '.test.all.json"')
  }
}

function trainData (options) {
  exec(config.apps.split + options.verbose + ' --exclude="' + options.base + '.test.all.json" "' + options.base + '.json" > "' + options.base + '.train.json"')

  if (options.alternatives) {
    exec(config.apps.alternative + options.verbose + ' --alternatives=' + options.alternatives + ' "' + options.base + '.train.json" > "' + options.base + '.train.alternatives.json"')
    exec(config.apps.merge + options.verbose + ' "' + options.base + '.train.json" "' + options.base + '.train.alternatives.json" > "' + options.base + '.train.all.json"')
  } else {
    exec('cp "' + options.base + '.train.json" "' + options.base + '.train.all.json"')
  }
}

function tokenizeAndMap (options) {
  exec(config.apps.tokenize + options.verbose + ' "' + options.base + '.test.all.json" > "' + options.base + '.test.tokenized.json"')

  exec(config.apps.tokenize + options.verbose + ' "' + options.base + '.train.all.json" > "' + options.base + '.train.tokenized.json"')

  exec(config.apps.mapping + options.verbose + ' --mapping="' + options.output + '/tokens.mapping.json" "' + options.base + '.test.tokenized.json" > "' + options.base + '.test.data.json"')

  exec(config.apps.mapping + options.verbose + ' --mapping="' + options.output + '/tokens.mapping.json" "' + options.base + '.train.tokenized.json" > "' + options.base + '.train.data.json"')
}

function createData () {
  var options = {}

  options.target = program.args.shift()

  if (!options.target) {
    return
  }

  options.output = program.output || 'tmp'
  options.key = program.key || options.target
  options.base = path.join(options.output, options.key)
  options.verbose = program.verbose
  options.alternatives = program.alternatives
  options.verbose = options.verbose ? ' --verbose' : ''

  mkdir('-p', options.output)

  fetchData(options)
  testData(options)
  trainData(options)
  tokenizeAndMap(options)
}

program
  .usage('[options] <target>')
  .option('-v, --verbose', 'verbose output')
  .option('-o, --output <path>', 'output folder')
  .option('-k, --key <name>', 'key name for the target, use for filenames')
  .option('-a, --alternatives <number>', 'number of alternatives per binding', parseInt)

program.parse(process.argv)

createData()
