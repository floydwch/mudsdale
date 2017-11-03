class TopicStore {
  constructor() {
    this.topics = []
    this.observers = []
  }

  get head() {
    return this.topics.slice(0, 20)
  }

  update() {
    this.observers.forEach(cb => cb(this.head))
  }

  push(topic) {
    this.topics.push(topic)
    this.update()
  }

  observe(cb) {
    this.observers.push(cb)
  }
}


exports.default = TopicStore
