const { spawn } = require('child_process')

exports.exec = function(args) {
  const child = spawn('sh', ['./node_modules/.bin/webpack --env production'])
    .on('error', (err) => {
      console.log(err)
      process.exit()
    })
  child.stdout.on('data', (chunk) => {
    console.log(chunk.toString('utf8'))
  })
  child.on('close', (code) => {
    console.log('closed with code: ', code)
    process.exit()
  })
}
