import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as actions from '../../actions'
import InputBox from '../InputBox'


export function App({topics, actions}) {
  const items = topics.map(topic => (
    <li>{topic}</li>
  ))

  return (
    <div>
      <InputBox handleSubmit={actions.create_topic}/>
      <ul>
        {items}
      </ul>
    </div>
  )
}


export default connect(
  state => ({topics: state.topics}),
  dispatch => ({actions: bindActionCreators(actions, dispatch)})
)(App)
