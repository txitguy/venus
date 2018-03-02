/**
 * Interactive script to build out pages in the app.
 */

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let colors = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',

  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',

  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m'
}

console.log(colors.FgGreen, "\r\n")
console.log('Welcome to the interactive page creation tool.')
console.log('This will guide you through the setup and creation of new pages for the application.')
console.log('Let\'s begin!', colors.Reset, "\r\n")

rl.question('What is the name of the page you want to create?  ', (pageName) => {
  pageName = pageName.toLowerCase();
  rl.question('Which layout would you like to extend? [base]  ', (layout) => {
    if (!layout) layout = 'base'
    layout = layout.toLowerCase();
    rl.question('What is the title of the page?  ', (pageTitle) => {
      console.log("\r\n")
      console.log('Here is your page summary:')
      console.log('Page Name: ' + colors.FgBlue + pageName + colors.Reset)
      console.log('Layout: ' + colors.FgBlue + layout + colors.Reset)
      console.log('Page Title: ' + colors.FgBlue + pageTitle + colors.Reset)
      console.log("\r\n")
      rl.question('Would you like to create this page now? [Y,n]  ', (verify) => {
        if (!verify) verify = 'y';
        let msg = (verify.toLowerCase() === 'y') ? colors.FgGreen + 'The page has been created.' : colors.FgRed + 'Canceling page creation.'
        console.log(msg, colors.Reset)
        rl.close()
        process.exit()
      })
    })
  })
})
