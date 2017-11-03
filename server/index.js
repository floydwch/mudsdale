const express = require('express')
const bodyParser = require('body-parser')


const app = express()
const api_router = express.Router()

const topics = []

api_router.get('/topics', (req, res) => {
  res.send({
    status: 'success',
    topics
  })
})

api_router.post('/topic', (req, res) => {
  const {title} = req.body

  if (title.length > 0 && title.length <= 255) {
    topics.push(req.body.title)
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

app.use(express.static('public'))
  .use(bodyParser.urlencoded({extended: false}))
  .use(bodyParser.json())
  .use('/api/v1', api_router)

app.listen(3000)
