const express = require('express')
const bodyParser = require('body-parser')
const websocketify = require('express-ws')

const TopicStore = require('./TopicStore').default


const app = express()
const api_router = express.Router()
websocketify(app)

const topic_store = new TopicStore()


// returns top 20 topics
// by get /api/v1/topics
api_router.get('/topics', (req, res) => {
  res.send({
    status: 'success',
    topics: topic_store.head
  })
})

// server pushes top 20 topics
// by listen to /api/v1/topics with WebSocket
api_router.ws('/topics', ws => {
  const observer = topics => {
    ws.send(JSON.stringify({topics}))
  }

  topic_store.observe(observer)

  ws.on('close', () => {
    topic_store.removeObserver(observer)
  })
})

// endpoint for posting a new topic
// returns the status and message of the operation
// by post /api/v1/topic with {title}
api_router.post('/topic', (req, res) => {
  const {title} = req.body

  if (title.length > 0 && title.length <= 255) {
    topic_store.push({
      title: req.body.title
    })
    res.send({
      status: 'success'
    })
  } else {
    res.send({
      status: 'error',
      message: 'title\'s length must be between 1 and 255.'
    })
  }
})

// endpoint for voting a topic by id
// by patch /api/v1/topics/:id with {vote := [1, -1]}
api_router.patch('/topics/:id', (req, res) => {
  topic_store.vote(req.params.id, req.body.vote)
  res.send({
    status: 'success'
  })
})

app.use(express.static('public'))
  .use(bodyParser.urlencoded({extended: false}))
  .use(bodyParser.json())
  .use('/api/v1', api_router)

app.listen(process.env.PORT)
