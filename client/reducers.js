import {combineReducers} from 'redux'


function topics(state=[], action) {
  switch (action.type) {
    case 'FULFILL_HEAD_TOPICS':
      return action.payload.topics
    default:
      return state
  }
}

export default combineReducers({
  topics
})
