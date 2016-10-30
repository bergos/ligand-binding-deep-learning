/* global exec */

var config = require('../config')
var forEach = require('lodash/forEach')
var map = require('lodash/map')

function fetchData (options) {
  var files = {}

  forEach(config.endpoints, function (url, key) {
    files[key] = {
      raw: options.base + '.' + key + '.json',
      canonical: options.base + '.' + key + '.canoncial.json'
    }
  })

  forEach(config.endpoints, function (url, key) {
    exec(config.apps.fromChembl + options.verbose + ' --endpoint=' + url + ' binding "' + options.target + '" > "' + files[key].raw + '"')
  })

  forEach(config.endpoints, function (url, key) {
    exec(config.apps.canonicalize + options.verbose + ' "' + files[key].raw + '" > "' + files[key].canonical + '"')
  })

  exec(config.apps.merge + options.verbose + ' "' + map(files, 'canonical').join('" "') + '" | ' + config.apps.aggregate + options.verbose + ' > "' + options.base + '.json"')
}

module.exports = fetchData
