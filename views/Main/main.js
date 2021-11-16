'use strict'

import { config } from '../config.js'

const socket = io()
const sample = document.querySelector('.sample')
const formats = document.getElementsByName('format')
const size = document.querySelector('.size')
const opacity = document.querySelector('.opacity')
const weight = document.querySelector('.weight')

// ページの読み込み完了後に実行
addEventListener('load', () => {
  sample.style.fontSize = `${config.size}px`
  sample.style.color = config.color
  sample.style.fontWeight = config.weight
  size.value = config.size
  opacity.value = config.opacity
  weight.value = config.weight

  // cookie値を読み取り、コピー用のURLに貼り付ける
  const cookie = document.cookie
  const url = document.querySelector('.url')
  url.value = `http://localhost:3000/screen?${cookie}`
})

// ####################
// サンプル値の変更
// ####################
size.addEventListener('input', (e) => {
  sample.style.fontSize = `${e.target.value}px`
})

opacity.addEventListener('input', (e) => {
  const opaPercent = e.target.value / 100
  sample.style.opacity = `${opaPercent}`
})

weight.addEventListener('input', (e) => {
  sample.style.fontWeight = e.target.value
})

// ラジオボタンの値を取得する
Array.from(formats).map((e) =>
  e.addEventListener('click', () => {
    console.log(e.value)
  })
)

// ####################
// WebSocket
// ####################
const selectingFormat = () => {
  let format = ''
  for (let i = 0; i < formats.length; i++) {
    if (formats[i].checked) {
      format = formats[i].value
    }
  }

  return format
}

// 10秒毎に選択中のフォーマットを送信する
setInterval(() => {
  const format = JSON.stringify({
    format: selectingFormat()
  })

  socket.emit('Format', format)

  console.log(format)
}, 10000)

// 5秒毎にデータを送信する
setInterval(() => {
  const layout = JSON.stringify({
    size: sample.style.fontSize
  })

  socket.emit('Layout', layout)

  console.log(layout)
}, 5000)
