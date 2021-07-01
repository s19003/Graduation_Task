'use strict'
const express = require('express')

const app = express()
const port = 3000

// setting
app.use(express.static('public'))

// routing
app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.get('/test', (req, res) => {
  res.sendFile(__dirname + '/public/setting.html')
})

// server
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
