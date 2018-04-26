const path = require('path')
const nodemon = require('nodemon')
const cfgPath = path.join(__dirname, '../webpack.config.js')
const exePath = path.join(__dirname, '../node_modules/.bin/webpack-dev-server')

exports.exec = function(args) {
  nodemon(`--watch ${cfgPath} --exec "${exePath} --config ${cfgPath} --open --hot --env development"`)
}
