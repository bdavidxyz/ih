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
environment.loaders.get('sass').use.find(item => item.loader === 'sass-loader').options.includePaths = ['node_modules']
// let cloneDeep = (obj) => {return JSON.parse(JSON.stringify(obj))}

// environment.generateMultiWebpackConfig = function(env) {
//   let webpackConfig = env.toWebpackConfig()
//   // extract entries to map later in order to generate separate 
//   // webpack configuration for each entry.
//   // P.S. extremely important step for tree-shaking
//   let entries = Object.keys(webpackConfig.entry)
 
//   // Finally, map over extracted entries to generate a deep copy of
//   // Webpack configuration for each entry to override Manifest fileName
//   return entries.map((entryName, i) => {
//     let deepClonedConfig = cloneDeep(webpackConfig)
//     deepClonedConfig.plugins.forEach((plugin, j) => {
//       // A check for Manifest Plugin
//       if (plugin.opts && plugin.opts.fileName) {
//         deepClonedConfig.plugins[j].opts.fileName = `manifest-${i}.json`
//       }
//     })
//     return Object.assign(
//       {},
//       deepClonedConfig,
//       { entry: { [entryName] : webpackConfig.entry[entryName] } }
//     )
//   })
// }


module.exports = environment

