import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import * as actions from './actions'
import store from './store'
import App from './components/App'


window.document.addEventListener('DOMContentLoaded', () => {
  store.dispatch(actions.load_head_topics())
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    window.document.getElementById('app')
  )
})
