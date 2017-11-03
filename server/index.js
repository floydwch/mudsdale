const express = require('express')
const bodyParser = require('body-parser')
const websocketify = require('express-ws')

const TopicStore = require('./TopicStore').default


const app = express()
const api_router = express.Router()
websocketify(app)

const topic_store = new TopicStore()

api_router.get('/topics', (req, res) => {
  res.send({
    status: 'success',
    topics: topic_store.head
  })
})

api_router.ws('/topics', ws => {
  const observer = topics => {
    ws.send(JSON.stringify({topics}))
  }

  topic_store.observe(observer)

  ws.on('close', () => {
    topic_store.removeObserver(observer)
  })
})

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

app.listen(3000)
