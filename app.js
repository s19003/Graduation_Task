'use strict'

const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

const port = 3000

// ==============================
// Settings
// ==============================
app.use(express.static('public'))
app.use(express.json())

// ==============================
// Routing
// ==============================

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.get('/screen', (req, res) => {
  res.sendFile(__dirname + '/public/screen.html')
})

app.get('/main', (req, res) => {
  res.sendFile(__dirname + '/public/main.html')
})

// ==============================
// Socket
// ==============================

io.on('connection', socket => {
  // socket.on('initialize', async initialize => {
  //   let newest = ''
  //   const first = await toggleTwitter(toggle, newest)
  //   console.log(first)

  //   toggle = false

  //   setInterval(async () => {
  //     const json = await toggleTwitter(toggle, newest)
  //     console.log(json)

  //     try {
  //       if (json.meta.result_count != 0) {
  //         newest = json.meta.newest_id
  //         io.emit('json', json)
  //       }
  //     } catch (e) {}
  //   }, 10000)
  // })

  // socket.on('settings', settings => {
  //   const obj = JSON.parse(settings)
  //   console.log(obj)
  //   if (obj.check) {
  //     toggle = true
  //     io.emit('layout', settings)
  //   } else {
  //     toggle = false
  //     io.emit('layout', settings)
  //   }
  //   console.log(toggle)
  // })
  console.log('接続しました')

  socket.on('Layout', layout => {
    io.emit('Layout', layout)
  })

  socket.on('Format', format => {
    io.emit('Format', format)
  })

  socket.on('disconnect', () => {
    console.log('接続が切れました')
  })
})

// ==============================
// Listening
// ==============================
server.listen(port, async () => {
  console.log(`http://localhost:${port}/main`)
})
