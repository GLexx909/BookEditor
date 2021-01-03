const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/home/lexx/Projects/React/Thinknetica/BookEditor/.docz/.cache/dev-404-page.js"))),
  "component---readme-md": hot(preferDefault(require("/home/lexx/Projects/React/Thinknetica/BookEditor/README.md"))),
  "component---src-components-pages-book-chapter-list-chapter-list-mdx": hot(preferDefault(require("/home/lexx/Projects/React/Thinknetica/BookEditor/src/components/pages/Book/ChapterList/ChapterList.mdx"))),
  "component---src-pages-404-js": hot(preferDefault(require("/home/lexx/Projects/React/Thinknetica/BookEditor/.docz/src/pages/404.js")))
}

