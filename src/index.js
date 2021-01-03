import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App";
import './index.css'
// import * as serviceWorker from './serviceWorker'

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// serviceWorker.unregister()
