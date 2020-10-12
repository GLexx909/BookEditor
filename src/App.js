import React from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom";

import { Provider } from 'react-redux'
import store from './redux/store'

import Main from "./components/pages/Main";

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route component={Main} path='/' exact />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
