import React from 'react'
import {BrowserRouter, matchPath, Route, Switch} from "react-router-dom";
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import store from './redux/store'

import Main from "./components/pages/Main";
import Chapter from "./components/pages/Chapter";

import { fetchChapters } from './redux/slices/chapters'
import { chapterPath } from './helpers/routes'

const history = createBrowserHistory()

const routes = [
  {
    component: Main,
    exact: true,
    strict: true,
    path: '/',
    loadData: () => {
      return store.dispatch(fetchChapters())
    }
  },
  {
    component: Chapter,
    exact: true,
    strict: true,
    path: chapterPath(),
    loadData: () => {
      return store.dispatch(fetchChapters())
    }
  }
]

const onLoad = () => {
  routes.some(route => {
    const match = matchPath(window.location.pathname, route)
    if (match && route.loadData) route.loadData(match)
    return match
  })
}

history.listen(() => {
  onLoad()
})

onLoad()

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter history={history}>
          <Switch>
            {
              routes.map((route, idx) => (
                <Route {...route} key={idx} />
              ))
            }
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
