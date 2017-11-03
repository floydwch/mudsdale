import {combineCycles} from 'redux-cycles'

import * as actions from './actions'


export function load_head_topics(source) {
  const request$ = source.ACTION
    .filter(action => action.type === 'LOAD_HEAD_TOPICS')
    .map(() => ({
      url: 'http://localhost:3000/api/v1/topics',
      method: 'get',
      category: 'topics'
    }))
  const action$ = source.HTTP
    .select('topics')
    .flatten()
    .map(payload => actions.fulfill_head_topics(payload.body))

  return {
    HTTP: request$,
    ACTION: action$
  }
}


export function create_topic(source) {
  const request$ = source.ACTION
    .filter(action => action.type === 'CREATE_TOPIC')
    .map(action => ({
      url: 'http://localhost:3000/api/v1/topic',
      method: 'post',
      send: {
        title: action.payload.title
      }
    }))

  return {
    HTTP: request$
  }
}


export default combineCycles(load_head_topics, create_topic)
