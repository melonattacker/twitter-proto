import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import App from './components/App'
import rootReducer from './reducers'
import { Provider } from 'react-redux'
import {BrowserRouter,Route,Switch} from "react-router-dom"

const store = createStore(rootReducer);

console.log(store.getState());

ReactDOM.render (
  <Provider store={store}>
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
        </Switch>
      </BrowserRouter>
  </Provider>
  ,document.getElementById('root')
)