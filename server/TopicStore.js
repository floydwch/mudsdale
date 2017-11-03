const uuid = require('uuid/v4')


class TopicStore {
  constructor() {
    this.topics = []
    this.topic_indices = {}
    this.observers = []
  }

  get head() {
    return this.topics.slice().sort((a, b) => b.votes - a.votes).slice(0, 20)
  }

  observe(cb) {
    this.observers.push(cb)
  }

  notify() {
    this.observers.forEach(cb => cb(this.head))
  }

  push(topic) {
    const id = uuid()
    this.topics.push({id, title: topic.title, votes: 0})
    this.topic_indices[id] = this.topics.length - 1
    this.notify()
  }

  vote(id, vote) {
    const topic = this.topics[this.topic_indices[id]]
    if (vote === 1) {
      topic.votes += 1
    } else if (vote === -1 && topic.votes > 0) {
      topic.votes -= 1
    }
    this.notify()
  }
}


exports.default = TopicStore
