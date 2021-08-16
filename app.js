'use strict'

const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

const port = 3000

const twitter = require('./Twitter/test.js').getRequest

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

// "/screen"に、GETリクエストを受信した場合
app.get('/screen', (req, res) => {
  res.sendFile(__dirname + '/public/screen.html')
})

// ==============================
// Socket
// ==============================

io.on('connection', socket => {
  // io.emit('chat message', 'ここにJSONです')

  socket.on('settings', settings => {
    io.emit('send json', settings)
  })

  // 接続が切れた時の処理
  socket.on('disconnect', () => {
    console.log('ユーザーの接続が切れました')
  })
})

// ==============================
// Listening
// ==============================
server.listen(port, () => {
  console.log(`http://localhost:${port}`)
  console.log(twitter())
})
