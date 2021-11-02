'use strict'

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

// ==============================
// Settings
// ==============================
app.use(express.static('public'))
app.use(express.json())

// ==============================
// Routing
// ==============================
app.get('/screen', (req, res) => {
  res.sendFile(__dirname + '/public/screen.html')
})

app.get('/main', (req, res) => {
  res.sendFile(__dirname + '/public/main.html')
})

// ==============================
// Socket
// ==============================
io.on('connection', (socket) => {
  console.log('接続しました')

  socket.on('Layout', (layout) => {
    io.emit('Layout', layout)
  })

  socket.on('Format', (format) => {
    io.emit('Format', format)
  })

  socket.on('disconnect', () => {
    console.log('接続が切れました')
  })
})

// ==============================
// Listening
// ==============================
const port = 3000
server.listen(port, async () => {
  console.log(`http://localhost:${port}/main`)
  console.log(`http://localhost:${port}/screen`)
})
