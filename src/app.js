const express = require('express')
const { uuid } = require('uuidv4')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const repositories = []

app.post('/repositories', (req, res) => {
  const newRepo = { ...req.body, id: uuid(), likes: 0 }

  repositories.push(newRepo)

  res.status(201).send(newRepo)
})

app.get('/repositories', (_, res) => {
  res.send(repositories)
})

app.put('/repositories/:id', (req, res) => {
  const { id } = req.params

  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if (repoIndex < 0) {
    res.status(400)
  }

  const updatedRepo = { ...repositories[repoIndex], ...req.body }

  res.status(201).send(updatedRepo)
})

module.exports = app
