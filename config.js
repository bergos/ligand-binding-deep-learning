var path = require('path')

var config = {
  apps: {
    aggregate: path.join(__dirname, 'node_modules/.bin/ligand-binding-aggregate'),
    alternative: path.join(__dirname, 'node_modules/.bin/ligand-binding-alternative'),
    canonicalize: path.join(__dirname, 'node_modules/.bin/ligand-binding-canonicalize'),
    fromChembl: path.join(__dirname, 'node_modules/.bin/ligand-binding-from-chembl'),
    info: path.join(__dirname, 'node_modules/.bin/ligand-binding-info'),
    merge: path.join(__dirname, 'node_modules/.bin/ligand-binding-merge'),
    split: path.join(__dirname, 'node_modules/.bin/ligand-binding-split'),
    tokenize: path.join(__dirname, 'node_modules/.bin/ligand-binding-tokenize'),
    buildNnMapping: path.join(__dirname, 'node_modules/.bin/ligand-binding-build-nn-mapping'),
    mapping: path.join(__dirname, 'node_modules/.bin/nn-mapping')
  },
  endpoints: {
    // 'chembl': 'https://www.ebi.ac.uk/rdf/services/chembl/sparql',
    // 'ki-database': 'http://localhost:3030/ki-database/query'
    'bindingdb': 'http://localhost:3030/bindingdb/query'
  },
  testData: {
    percentage: 0.1
  }
}

module.exports = config
