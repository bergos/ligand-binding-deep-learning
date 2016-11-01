#! /bin/bash

node create-mapping.js --properties=binds
node create-dataset.js -v --key '5-ht2a' '5-hydroxytryptamine receptor 2A'
node create-dataset.js -v --key '5-ht2a-a50' '5-hydroxytryptamine receptor 2A'
