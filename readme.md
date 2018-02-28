

# Web Design & Development Framework

A framework to assist in the design and development of webpages.

## Features
* [Pug](https://pugjs.org) as a template engine
* [SCSS](http://sass-lang.com) preprocessor for CSS ([autoprefixer](https://github.com/postcss/autoprefixer) included)
* JS linting with [Eslint](https://eslint.org), extends [eslint-config-standard](https://github.com/standard/eslint-config-standard), includes the following plugins:
  * [import](https://github.com/benmosher/eslint-plugin-import)
  * [node](https://github.com/mysticatea/eslint-plugin-node)
  * [promise](https://github.com/xjamundx/eslint-plugin-promise)
  * [compat](https://github.com/amilajack/eslint-plugin-compat)
* CSS linting with [Stylelint](http://stylelint.io)

## Prerequisites
* NodeJS ([download](https://nodejs.org/en/download/))
* Yarn ([installation](https://yarnpkg.com/lang/en/docs/install/))
* Nodemon ([github](https://github.com/remy/nodemon))

> Note: While not mandatory, I do recommend you install `Git` and `Git Bash`.  This will make running some of the commands easier.  Learn more and download it on the [git website](https://git-scm.com/).

## Installation:
* Clone or download the repo to your local machine.
* Run `yarn install` to fetch all of the dependencies.

## Usage

### Development
To start development, simply run `yarn start`.  At this point, you can begin development.  Any changes you make will be automatically compiled and will refresh your browser window.

### Production

Running `yarn build` will build out the different pages and css files in the `build` directory.  In addition, this will run an analyzer to give performance statistics on each page and file.  This should be monitored to ensure no pages are using too many resources.

## Application

All development is done inside of the `app` folder.  The only exception to that is when you are creating a new page for the first time.  There are three folders inside of the `app` folder: `assets`, `common`, and `pages`.

### Assets

Assets are files which you would like to be included in the application.  These could be fonts, images, or any other static files.  It is preferable to have these separated into different folders for easy navigation.

### Common

The common folder will hold files which are used in multiple pages.  This includes layout files and main css files.  In addition, you can also create widgets that can be used across multiple pages.

An example of that would be if you wanted to create a contact form which would be used in various places around the website.  Instead of rewriting that code in multiple pages, you simply create a widget and then use pug's features to include it.

### Pages

Pages are just what they sound like, different pages that are hosted in the application.  Each page has it's own directory to hold all of the required files for that page.  Each page requires 2 files, a javascript file and a pug file.

The javascript file is normally created once and never updated.  It includes the required files for the page to render during development.

The pug file is the layout or template of the page.  It should generally extend a layout from the common folder.  Each page should begin with an css ID so that we can use strict specificity in the CSS.

Another common file to be included in the page directory is the sass file.  This is the css specifically for that page.

## Creating A New Page

When creating a new page there are a couple of steps you need to take in order for it to be properly compiled and viewable.

### 1. Create the required files

The first step is to create the required files for the page, including the directory it's listed under the `pages` folder.  These files are what we described in the `Application` section of this documentation, a javascript file and pug file.  These should be appropriately named after the page.  For example, if you're creating a page called `contact`, the files should be named `contact.js` and `contact.pug`.  Additionally, you may want a `contact.scss` file as well.

### 2. Add the entry point

In order to access that page, you need to create an entry point.  To do this, follow these steps:
* Open `webpack.config.js`
* Find the `commonConfig` constant and locate the `entry` key.  It will look something like this:
~~~~
    entry: {
      'index': `${PATHS.app}/pages/index/index.js`,
      'blog': `${PATHS.app}/pages/blog/blog.js`
    },
~~~~
* Add a new entry for your page.  If you're creating a page called `contact`, it would now look like this:
~~~~
    entry: {
      'index': `${PATHS.app}/pages/index/index.js`,
      'blog': `${PATHS.app}/pages/blog/blog.js`,
      'contact': `${PATHS.app}/pages/contact/contact.js`
    },
~~~~
* In the same `commonConfig` constant, find the `plugins` key.  It will look something like this:
~~~~
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['index', 'common'],
        template: `${PATHS.app}/pages/index/index.pug`
      }),
      new HtmlWebpackPlugin({
        filename: 'blog.html',
        chunks: ['blog', 'common'],
        template: `${PATHS.app}/pages/blog/blog.pug`
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
      }),
      new FriendlyErrorsPlugin(),
      new StylelintPlugin(lintStylesOptions)
    ],
~~~~
* Update it to add in a package for your new page.  It will now look something like this:
~~~~
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['index', 'common'],
        template: `${PATHS.app}/pages/index/index.pug`
      }),
      new HtmlWebpackPlugin({
        filename: 'blog.html',
        chunks: ['blog', 'common'],
        template: `${PATHS.app}/pages/blog/blog.pug`
      }),
      new HtmlWebpackPlugin({
        filename: 'contact.html',
        chunks: ['contact', 'common'],
        template: `${PATHS.app}/pages/contact/contact.pug`
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
      }),
      new FriendlyErrorsPlugin(),
      new StylelintPlugin(lintStylesOptions)
    ],
~~~~

You will now have a new page created that you can access by going to `localhost:8080/contact.html`.

## CSS Specificity

One of the important things for us to work on is css specificity.  This allow us to make changes in different pages or areas of the website without affecting other areas.  In order to do this properly, this means we need strict specificity.

### Pug Files

All pug files will most likely around be blocks, but the content should always begin with an id for that page.  This id should be prefixed with page-, and all words should be separated by hyphens and not camel case.  Here is an example of what that contact pug file would look like:

~~~~
extends ../../common/layouts/base
block title
    | Contact Us
block main
    #page-contact
        h1 Contact Us!
~~~~

### Sass Files

All sass files should follow the same pattern and be encapsulated by that id.  Here is an example for the sass file:

~~~~
#page-contact {
  h1 {
    color: color("dark");
  }
}
~~~~

## Help

Below are a list of websites that can give you support for different features of this framework:

* [Sass Documentation](https://sass-lang.com/documentation/file.SASS_REFERENCE.html)
* [Pug Documentation](https://pugjs.org/api/getting-started.html)
  * Struggling with Pug?  [This site will convert html to pug for you!](http://html2jade.org/)
* [Bootstrap Documentation](https://getbootstrap.com/docs/4.0/getting-started/introduction/)

Still need help?  Either [email](mailto:markr@scotsmanguide.com) or come ask `Mark`.