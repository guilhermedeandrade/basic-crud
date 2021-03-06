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

  res.status(201).json(newRepo)
})

app.get('/repositories', (_, res) => {
  res.json(repositories)
})

app.put('/repositories/:id', (req, res) => {
  const { id } = req.params
  const { url, title, techs } = req.body

  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if (repoIndex < 0) {
    res.status(400).json({ error: 'Repository not found' })
  }

  const updatedRepo = {
    ...repositories[repoIndex],
    url,
    title,
    techs,
  }

  repositories[repoIndex] = updatedRepo

  res.status(201).json(updatedRepo)
})

app.delete('/repositories/:id', (req, res) => {
  const { id } = req.params

  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if (repoIndex < 0) {
    res.status(400).json({ error: 'Repository not found' })
  }

  repositories.splice(repoIndex, 1)

  res.status(204).send()
})

app.post('/repositories/:id/like', (req, res) => {
  const { id } = req.params

  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if (repoIndex < 0) {
    res.status(400).json({ error: 'Repository not found' })
  }

  const updatedRepo = {
    ...repositories[repoIndex],
    likes: repositories[repoIndex].likes + 1,
  }

  repositories[repoIndex] = updatedRepo

  res.status(201).json(updatedRepo)
})

module.exports = app
