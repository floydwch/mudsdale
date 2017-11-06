const uuid = require('uuid/v4')


// supoort Observer Pattern
class TopicStore {
  constructor() {
    this.topics = []
    this.topic_indices = {}
    this.observers = new Set()
  }

  // get top 20 topics
  get head() {
    return this.topics.slice().sort((a, b) => b.votes - a.votes).slice(0, 20)
  }

  observe(observer) {
    this.observers.add(observer)
  }

  removeObserver(observer) {
    this.observers.delete(observer)
  }

  notify() {
    this.observers.forEach(cb => cb(this.head))
  }

  // push new topic to the store
  push(topic) {
    const id = uuid()
    this.topics.push({id, title: topic.title, votes: 0})
    this.topic_indices[id] = this.topics.length - 1
    this.notify()
  }

  // vote topic by id
  // vote := [1, -1], 1 for upvoate, -1 for downvote
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
