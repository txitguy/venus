/**
 * Interactive script to build out pages in the app.
 */

const fs = require('fs-extra')
const readline = require('readline')
const path = require('path')

const PATHS = {
    pages: path.join(__dirname, '../../app/pages/'),
    templates: path.join(__dirname, 'templates/')
}

const colors = {
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

var Page = {
    name: '',
    title: '',
    layout: 'base' // default
}

function getPageName(rl) {
    rl.question('What is the name of the page you want to create?  ', (pageName) => {

        if (!pageName) {
            console.log(colors.FgRed, "\r\n")
            console.log('The page name is a required field.')
            console.log(colors.Reset)
            getPageName(rl)
            return
        }

        // make the page lower case
        pageName = pageName.toLowerCase()

        // check if page already exists
        if (fs.pathExistsSync(`${PATHS.pages}${pageName}`)) {
            console.log(colors.FgRed, "\r\n")
            console.log('That page already exists. Try again.')
            console.log(colors.Reset)
            getPageName(rl)
        } else {

            // Set the value and move to the next step
            Page.name = pageName;
            getPageLayout(rl)
        }
    })
}

function getPageLayout(rl) {
    rl.question('Which layout would you like to extend? [base]  ', (layout) => {

        // set default
        if (!layout) {
            layout = Page.layout
        }

        // validate the layout
        if (!fs.pathExistsSync(`${PATHS.templates}${layout}`)) {
            console.log(colors.FgRed, "\r\n")
            console.log('That layout does not exist.  Try again.')
            console.log(colors.Reset)
            getPageLayout(rl)
        } else {

            // Set the value and move to the next step
            Page.layout = layout
            getPageTitle(rl)
        }
    })
}

function getPageTitle(rl) {
    rl.question('What is the title of the page? (empty)  ', (pageTitle) => {

        // set the value and move to the next step
        Page.title = pageTitle
        confirmCreatePage(rl)
    })
}

function confirmCreatePage(rl) {

    // show page details
    console.log("\r\n")
    console.log('Here is your page summary:')
    console.log('Page Name: ' + colors.FgBlue + Page.name + colors.Reset)
    console.log('Layout: ' + colors.FgBlue + Page.layout + colors.Reset)
    console.log('Page Title: ' + colors.FgBlue + Page.title + colors.Reset)
    console.log("\r\n")

    rl.question('Would you like to create this page now? [Y,n]  ', (verify) => {

        verify = verify.toLowerCase() || 'y'
        if (verify === 'y') {
            createPage()
        } else {
            console.log(colors.FgRed, "\r\n")
            console.log("Canceling page creating.")
            console.log(colors.Reset)
            process.exit()
        }
    }) 
}

function createPage() {

    // Copy the layout to the pages folder
    fs.copySync(`${PATHS.templates}${Page.layout}`, `${PATHS.pages}${Page.name}`)

    // Rename the files and overwrite template variables
    fs.readdir(`${PATHS.pages}${Page.name}`, (err, items) => {
        
        items.forEach((item) => {

            // Move the file
            let newFile = Page.name + '.' + item.split('.').slice(1).join('.');
            fs.moveSync(`${PATHS.pages}${Page.name}/${item}`, `${PATHS.pages}${Page.name}/${newFile}`)

            // Load the contents
            let fileContents = fs.readFileSync(`${PATHS.pages}${Page.name}/${newFile}`, 'utf8')

            // Overwrite any template vars
            fileContents = fileContents.replace(/{{page.name}}/, Page.name)
            fileContents = fileContents.replace(/{{page.title}}/, Page.title)
            fileContents = fileContents.replace(/{{page.layout}}/, Page.layout)

            // Save the file
            fs.writeFileSync(`${PATHS.pages}${Page.name}/${newFile}`, fileContents)
        })

        console.log(colors.FgGreen, "\r\n")
        console.log("Page successfully created!")
        console.log(colors.Reset)
    
        process.exit()
    })
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

getPageName(rl)