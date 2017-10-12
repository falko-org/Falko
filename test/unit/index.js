import Vue from 'vue'

Vue.config.productionTip = false

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

const srcContext = require.context('../../src/components', true, /\.vue$/)		
srcContext.keys().forEach(srcContext)