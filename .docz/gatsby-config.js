const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Bookeditor',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: '/home/lexx/Projects/React/Thinknetica/BookEditor/.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Bookeditor',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: '/home/lexx/Projects/React/Thinknetica/BookEditor',
          templates:
            '/home/lexx/Projects/React/Thinknetica/BookEditor/node_modules/docz-core/dist/templates',
          docz: '/home/lexx/Projects/React/Thinknetica/BookEditor/.docz',
          cache:
            '/home/lexx/Projects/React/Thinknetica/BookEditor/.docz/.cache',
          app: '/home/lexx/Projects/React/Thinknetica/BookEditor/.docz/app',
          appPackageJson:
            '/home/lexx/Projects/React/Thinknetica/BookEditor/package.json',
          appTsConfig:
            '/home/lexx/Projects/React/Thinknetica/BookEditor/tsconfig.json',
          gatsbyConfig:
            '/home/lexx/Projects/React/Thinknetica/BookEditor/gatsby-config.js',
          gatsbyBrowser:
            '/home/lexx/Projects/React/Thinknetica/BookEditor/gatsby-browser.js',
          gatsbyNode:
            '/home/lexx/Projects/React/Thinknetica/BookEditor/gatsby-node.js',
          gatsbySSR:
            '/home/lexx/Projects/React/Thinknetica/BookEditor/gatsby-ssr.js',
          importsJs:
            '/home/lexx/Projects/React/Thinknetica/BookEditor/.docz/app/imports.js',
          rootJs:
            '/home/lexx/Projects/React/Thinknetica/BookEditor/.docz/app/root.jsx',
          indexJs:
            '/home/lexx/Projects/React/Thinknetica/BookEditor/.docz/app/index.jsx',
          indexHtml:
            '/home/lexx/Projects/React/Thinknetica/BookEditor/.docz/app/index.html',
          db:
            '/home/lexx/Projects/React/Thinknetica/BookEditor/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
