var path = require('path')
var webpack = require('webpack')
const cfgPath = path.join(__dirname, '../webpack.config.js')

exports.exec = function(args) {
  const webpackConfig = require(cfgPath)('production')
  webpack(webpackConfig, (err, stats) => {
    if (err) throw err

    console.log('Build Complete')
  })
}
