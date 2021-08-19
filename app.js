'use strict'

const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

const port = 3000
let toggle = true
let newest = ''

const twitter = require('./Twitter/twitter.js').getTweets
const toggleTwitter = require('./Twitter/twitter.js').toggleTwitter

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
  socket.on('initialize', async initialize => {
    console.log('--------------最初のツイートは削除-----------------')
    const first = await toggleTwitter(toggle, newest)
    console.log(first)
    newest = first.meta.newest_id
    console.log('-----------------------------------------')

    toggle = false

    setInterval(async () => {
      const json = await toggleTwitter(toggle, newest)
      console.log(json)
      try {
        if (json.meta.result_count != 0) {
          newest = json.meta.newest_id
          io.emit('json', json)
        }
      } catch (e) {
        console.log(e)
      }
    }, 10000)
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
