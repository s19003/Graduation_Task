'use strict'

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
app.get('/screen', (req, res) => {
  res.sendFile(__dirname + '/public/screen.html')
})

app.get('/main', (req, res) => {
  if (req.cookies.id === undefined) {
    const id = require('uuid').v4()

    res.cookie('id', id, {
      maxAge: 60000,
      httpOnly: false
    })

    console.log('cookieを作成しました')
  } else {
    console.log(`id=${req.cookies.id}`)
  }

  // const randomID = require('uuid').v4()
  // console.log(randomID)

  res.render('./main.ejs')
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
const ip = '172.16.41.93'
const port = 3000
server.listen(port, async () => {
  console.log(`http://${ip}:${port}/main`)
  console.log(`http://${ip}:${port}/screen`)
  console.log(`http://localhost:3000/main`)
  console.log(`http://localhost:3000/screen`)
})
