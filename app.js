'use strict'

const express = require('express')
const app = express()
const port = 3000

// ==============================
// Settings
// ==============================
app.use(express.static('public'))
app.use(express.json())

// ==============================
// Routing
// ==============================
app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.get('/screen', (req, res) => {
  res.sendFile(__dirname + '/public/screen.html')
})

app.post('/', (req, res) => {
  const sampleJson = req.body

  console.log('OKOK')

  app.post('/screen', (req, res) => {
    res.json(sampleJson)
  })
})

// ==============================
// Server
// ==============================
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
