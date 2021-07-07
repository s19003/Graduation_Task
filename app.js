'use strict'

const express = require('express')
const app = express()
const port = 3000

let sample = { test: 'test' }

// ==============================
// Settings
// ==============================
app.use(express.static('public'))
app.use(express.json())

// ==============================
// Routing
// ==============================

// "/"に、GET・POSTリクエストを受信した場合
app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.post('/', (req, res) => {
  const test = JSON.stringify(req.body)
  sample = test
  console.log(sample)
})

// "/screen"に、GETリクエストを受信した場合
app.get('/screen', (req, res) => {
  res.sendFile(__dirname + '/public/screen.html')
})

app.post('/screen', (req, res) => {
  res.json(sample)
})

// ==============================
// Server
// ==============================
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
