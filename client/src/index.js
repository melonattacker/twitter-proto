import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import App from './components/App'
import MyList from './components/MyList'
import AllList from './components/AllList'
import rootReducer from './reducers'
import { Provider } from 'react-redux'
import {BrowserRouter,Route,Switch} from "react-router-dom"

const store = createStore(rootReducer);


ReactDOM.render (
  <Provider store={store}>
      <BrowserRouter>
        <Switch>
            <Route exact path='/' component={App} />
            <Route path='/mylist' component={MyList} />
            <Route path='/timeline' component={AllList} />
        </Switch>
      </BrowserRouter>
  </Provider>
  ,document.getElementById('root')
)