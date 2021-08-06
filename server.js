const express = require('express')
const app = express()
const port = 3000

app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

const store = require('./store/mem')

app.get('/', (req, res, next) => {
  res.send('hello world!')
})

app.get('/api/todo', (req, res, next) => {
  res.json(store.getAllTasks())
})

app.post('/api/todo', (req, res, next) => {
  const newPost = req.body
  if (newPost.hasOwnProperty('title')) {
    const result = store.add(newPost.title)
    res.status(200)
    res.json(result)
  } else {
    res.status(400)
    res.json({
      status: 400,
      message: 'title is required'
    })
  }
})

app.put('/api/todo/:id', (req, res, next) => {
  const newPost = req.body
  if (newPost.hasOwnProperty('title') && req.params.id) {
    try {
      const result = store.update(req.params.id, newPost.title)
      res.status(200)
      res.json(result)
    } catch (error) {
      res.status(400)
      res.json({
        status: 400,
        message: error.message
      })
    }
  } else {
    res.status(400)
    res.json({
      status: 400,
      message: 'id and title are required'
    })
  }
})

app.put('/api/todo/:id/set_done', (req, res, next) => {
  if (req.params.id) {
    try {
      const result = store.setDone(req.params.id)
      res.status(200)
      res.json(result)
    } catch (error) {
      res.status(400)
      res.json({
        status: 400,
        message: error.message
      })
    }
  } else {
    res.status(400)
    res.json({
      status: 400,
      message: 'id is required'
    })
  }
})

app.put('/api/todo/:id/set_undone', (req, res, next) => {
  if (req.params.id) {
    try {
      const result = store.setUndone(req.params.id)
      res.status(200)
      res.json(result)
    } catch (error) {
      res.status(400)
      res.json({
        status: 400,
        message: error.message
      })
    }
  } else {
    res.status(400)
    res.json({
      status: 400,
      message: 'id is required'
    })
  }
})

app.delete('/api/todo/:id', (req, res, next) => {
  if (req.params.id) {
    try {
      const result = store.delete(req.params.id)
      res.status(200)
      res.json(result)
    } catch (error) {
      res.status(400)
      res.json({
        status: 400,
        message: error.message
      })
    }
  } else {
    res.status(400)
    res.json({
      status: 400,
      message: 'id is required'
    })
  }
})

app.get('/api/todo/:id', (req, res, next) => {
  try {
    const result = store.getTaskById(req.params.id)
    res.json(result)
  } catch (error) {
    res.status(400)
    res.json({
      status: 400,
      message: error.message
    })
  }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})