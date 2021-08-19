'use strict'

const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

const port = 3000
let toggle = false

const twitter = require('./Twitter/twitter.js').getTweets

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
  socket.on('initialize', initialize => {
    console.log(initialize)
    toggleTwitter()
  })

  socket.on('settings', settings => {
    if (settings) {
      toggle = true
    } else {
      toggle = false
    }
    console.log(toggle)
  })

  // 接続が切れた時の処理
  socket.on('disconnect', () => {
    console.log('ユーザーの接続が切れました')
  })
})

// ==============================
// Listening
// ==============================
server.listen(port, async () => {
  console.log(`http://localhost:${port}`)
})

const callbackGetTweet = async () => {
  const tweets = await twitter('猫')

  setTimeout(() => {
    io.emit('tweets json', tweets)
    callbackGetTweet()
  }, 20000)
}

const toggleTwitter = () => {
  setInterval(async () => {
    if (toggle === false) {
      console.log('Toggle=False')
    } else {
      const tweets = await twitter('猫')
      io.emit('tweets json', tweets)
    }
  }, 10000)
}
