import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as actions from '../../actions'
import InputBox from '../InputBox'
import TopicListItem from '../TopicListItem'


export function App({topics, actions}) {
  const items = topics.map(topic => (
    <TopicListItem
      key={`topic-list-item-${topic.id}`}
      topic={topic}
      handleUpvote={() => actions.vote_topic({id: topic.id, vote: 1})}
      handleDownvote={() => actions.vote_topic({id: topic.id, vote: -1})}
    />
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
