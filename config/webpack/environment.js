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

module.exports = environment
