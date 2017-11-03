import {adapt} from '@cycle/run/lib/adapt'
import xs from 'xstream'
import {combineCycles} from 'redux-cycles'

import * as actions from './actions'


export function load_head_topics(source) {
  const request$ = source.ACTION
    .filter(action => action.type === 'LOAD_HEAD_TOPICS')
    .map(() => ({
      url: '/api/v1/topics',
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


export function sync_head_topics(source) {
  const action$ = source.WS
    .map(e => actions.fulfill_head_topics(JSON.parse(e.data)))

  return {
    ACTION: action$
  }
}


export function create_topic(source) {
  const request$ = source.ACTION
    .filter(action => action.type === 'CREATE_TOPIC')
    .map(action => ({
      url: '/api/v1/topic',
      method: 'post',
      send: {
        title: action.payload.title
      }
    }))

  return {
    HTTP: request$
  }
}


export function vote_topic(source) {
  const request$ = source.ACTION
    .filter(action => action.type === 'VOTE_TOPIC')
    .map(action => ({
      url: `/api/v1/topics/${action.payload.id}`,
      method: 'patch',
      send: {
        vote: action.payload.vote
      }
    }))

  return {
    HTTP: request$
  }
}


export function WSDriver() {
  const source = xs.create({
    start: listener => {
      this.connection = new WebSocket('ws://shrouded-oasis-20966.herokuapp.com/api/v1/topics')
      this.connection.onerror = err => {
        listener.error(err)
      }
      this.connection.onmessage = msg => {
        listener.next(msg)
      }
      this.connection.onclose = e => {
        // handle heroku's automatically close ws issue
        if (e.code === 1006) {
          const {onmessage, onerror, onclose} = this.connection
          this.connection = new WebSocket('ws://shrouded-oasis-20966.herokuapp.com/api/v1/topics')
          this.connection.onerror = onerror
          this.connection.onmessage = onmessage
          this.connection.onclose = onclose
        }
      }
    },
    stop: () => {
      this.connection.close()
    }
  })

  return adapt(source)
}


export default combineCycles(
  load_head_topics,
  sync_head_topics,
  create_topic,
  vote_topic
)
