const { environment } = require('@rails/webpacker')

const webpack = require('webpack')

// required to be available through bootstrap's own JS.
environment.plugins.append(
  'Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    Popper: ['popper.js', 'default']
  })
)


environment.generateMultiWebpackConfig = function(env) {
  // Side-Effect: broken manifest.json file will be generated if
  // writeToFileEmit enabled, failing the parsing and Webpack 
  // compilation randomly.
  // Github Issue: https://github.com/rails/webpacker/issues/1251 
  env.plugins.get('Manifest').opts.writeToFileEmit = false
  
  let webpackConfig = env.toWebpackConfig()
  
  // extract entries to map later in order to generate separate 
  // webpack configuration for each entry.
  // P.S. extremely important step for tree-shaking
  let entries = Object.keys(webpackConfig.entry)
  
  // Generate a seed file containing all the entries to write to 
  // manifest.json when writeToFileEmit is enabled for the last 
  // entry later on. Without it, only last entry will be written   
  // down to manifest.json
  environment.plugins.get('Manifest').opts.reduce = function(_, file) {
    environment.plugins.get('Manifest').opts.seed = Object.assign(
      environment.plugins.get('Manifest').opts.seed || {},
      {[file.name] : file.path}
    )
    return environment.plugins.get('Manifest').opts.seed
  }
  // Finally, map over extracted entries to generate a separate 
  // Webpack configuration for each entry and enable writeToFileEmit 
  // only for the last entry
  return entries.map(function (entryName, i) { 
    if (i === entries.length - 1) {
      env.plugins.get('Manifest').opts.writeToFileEmit = true
      webpackConfig = env.toWebpackConfig()
    }
    return Object.assign(
      {},
      webpackConfig,
      { entry: { [entryName] : webpackConfig.entry[entryName] } }
    )
  })
}


module.exports = environment

