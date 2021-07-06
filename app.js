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

app.post('/', (req, res) => {
  let sampleJson = {
    platform: 'Twitter',
    name: '上原',
    comment: 'とても面白いです!!',
    date: new Date().toLocaleString()
  }

  res.json(sampleJson)
  console.log('OK')
})

// server
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
