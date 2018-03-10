#! /usr/bin/env node
/**
 * Venus - main script
 * Takes arguments and passes it to other scripts
 * Help Menu:
 *
 * Venus v1.0.0
 * Web design and development framework
 *
 * Usage: venus [command] [arguments]
 *
 * [command]    -  Description
 *      [argument]      - Description
 *
 * create       -  Creates a venus module
 *      page [name]     - Creates a new page in the project.  optional name parameter
 *      project         - Initializes the current directory as a new venus project
 *      widget [name]   - Creates a new widget.  optional name parameter
 *
 * start        -   Begins development mode
 * build        -   Builds the app into bundled files
 * publish      -   Publishes the app to production
 */

// node_module requires
const path = require('path')
const fs = require('fs-extra')

// internal requires
const term = require(path.join(__dirname, '../etc/term/term.js'))
const pkg = fs.readJsonSync(path.join(__dirname, '../package.json'))

// include commands
const build = require(path.join(__dirname, 'build.js'))
const start = require(path.join(__dirname, 'start.js'))
const publish = require(path.join(__dirname, 'publish.js'))
const createPage = require(path.join(__dirname, 'create-page.js'))
const createWidget = require(path.join(__dirname, 'create-widget.js'))
const createProject = require(path.join(__dirname, 'create-project.js'))

function showHelp() {
  console.log(term.colors.FgGreen, term.newLine)

  console.log(`${pkg.name} v${pkg.version}`)
  console.log(pkg.description, term.newLine, term.colors.Reset)
  console.log('Usage: venus', term.colors.FgBlue, '[command]', term.colors.FgCyan, '[arguments]', term.newLine)

  console.log(term.colors.FgBlue, '[command]', term.tab, term.tab, term.colors.FgWhite, 'Description')
  console.log(term.tab, term.colors.FgCyan, '[argument]', term.tab, term.tab, term.colors.FgWhite, 'Description', term.newLine)

  console.log(term.colors.FgBlue, 'create', term.tab, term.tab, term.tab, term.colors.FgWhite, 'Creates a venus module')
  console.log(term.tab, term.colors.FgCyan, 'page [name]', term.tab, term.tab, term.colors.FgWhite, 'Creates a new page in the project.  optional name parameter')
  console.log(term.tab, term.colors.FgCyan, 'project', term.tab, term.tab, term.colors.FgWhite, 'Initializes the current directory as a new venus project')
  console.log(term.tab, term.colors.FgCyan, 'widget [name]', term.tab, term.colors.FgWhite, 'Creates a new widget.  optional name parameter', term.newLine)

  console.log(term.colors.FgBlue, 'start', term.tab, term.tab, term.tab, term.colors.FgWhite, 'Begins development mode')
  console.log(term.colors.FgBlue, 'create', term.tab, term.tab, term.colors.FgWhite, 'Creates a venus module')
  console.log(term.colors.FgBlue, 'publish', term.tab, term.tab, term.colors.FgWhite, 'Publishes the app to production')
  console.log(term.colors.FgBlue, 'help', term.tab, term.tab, term.tab, term.colors.FgWhite, 'Shows this help page', term.newLine)

  console.log('Examples:', term.newLine)

  console.log('Create a new page:')
  console.log('venus create page')
  console.log('venus create page blog', term.newLine)
}

let args = process.argv.splice(2)

if (!args.length) {
  showHelp()
  process.exit()
} else {
  let cmd = args[0]
  args = args.splice(1)
  switch (cmd) {
    case 'create':
      let subCmd = args[0]
      args = args.splice(1)
      switch (subCmd) {
        case 'page':
          createPage.exec(args)
          break
        case 'project':
          createProject.exec(args)
          break
        case 'widget':
          createWidget.exec(args)
          break
        default:
          console.log(term.colors.FgRed)
          console.log('unknown command', term.colors.Reset)
          console.log('For help, use: venus help')
          process.exit()
      }
      break

    case 'start':
      start.exec(args)
      break

    case 'build':
      build.exec(args)
      break

    case 'publish':
      publish.exec(args)
      break

    default:
      console.log(term.colors.FgRed)
      console.log('unknown command', term.colors.Reset)
      console.log('For help, use: venus help')
      process.exit()
  }
}
