process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')

// disabled for tree-shaking, and replaced by line below
module.exports = environment.toWebpackConfig()
// module.exports = environment.generateMultiWebpackConfig(environment)
