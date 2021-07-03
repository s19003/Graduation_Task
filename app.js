'use strict'
const express = require('express')

const app = express()
const port = 3000

// setting
app.use(express.static('public'))
app.use(express.json())

// routing
app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.post('/post', (req, res) => {
  console.log(req.body)
})

// server
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
