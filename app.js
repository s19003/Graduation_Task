'use strict'

const Twitter = require('./Twitter/twitter')
const twitter = new Twitter()

const Youtube = require('./Youtube/youtube.js')
const youtube = new Youtube()

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const cookieParser = require('cookie-parser')

// Settings
app.set('view engine', 'ejs') // デフォルトエンジンをejsに指定
app.use(express.static('views')) // 静的フォルダを指定
app.use(express.json()) // json値を読み取れるようにする
app.use(cookieParser()) // cookie値を読み取れるようにする

// Routing
app.get('/main', (req, res) => {
  if (req.cookies.id === undefined) {
    const id = require('uuid').v4()

    // 初回接続時に、cookieの作成
    res.cookie('id', id, {
      maxAge: 31536000,
      httpOnly: false
    })
  }

  res.render('./main.ejs')
})

app.get('/screen', (req, res) => {
  res.render('./screen.ejs')
})

// Socket
io.on('connection', (socket) => {
  console.log('接続しました')

  socket.on('Layout', (layout) => {
    io.emit('Layout', layout)
  })

  socket.on('Twitter', async (json) => {
    const hashTag = JSON.parse(json).hashTag
    const tweets = await twitter.getTweets(hashTag)
    io.emit('Tweets', tweets)
  })

  socket.on('Youtube', async (json) => {
    const id = JSON.parse(json).youtubeId
    const chats = await youtube.getChatId(id)
    io.emit('Chats', chats)
  })

  socket.on('disconnect', () => {
    console.log('接続が切れました')
  })
})

// Listening
const ip = '172.16.41.93'
const port = 3000
server.listen(port, async () => {
  console.log(`http://${ip}:${port}/main`)
  console.log(`http://${ip}:${port}/screen`)
  console.log(`http://localhost:3000/main`)
  console.log(`http://localhost:3000/screen`)
})
