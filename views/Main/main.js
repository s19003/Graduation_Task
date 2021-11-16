'use strict'

import { config } from '../config.js'

const socket = io()
const sample = document.querySelector('.sample')
const size = document.querySelector('.size')
const weight = document.querySelector('.weight')
const opacity = document.querySelector('.opacity')
const formats = document.getElementsByName('format')

// クライアント識別用ID
let cookie = document.cookie

let format = config.format

// ページの読み込み完了後に実行
addEventListener('load', () => {
  sample.style.fontSize = `${config.size}px`
  sample.style.color = config.color
  sample.style.fontWeight = config.weight
  sample.style.opacity = config.opacity
  size.value = config.size
  weight.value = config.weight
  opacity.value = config.opacity

  // cookie値を読み取り、コピー用のURLに貼り付ける
  const url = document.querySelector('.url')
  url.value = `http://localhost:3000/screen?${cookie}`

  // レイアウトの制限を行う関数(初回実行)
  layoutDisabled(format)
})

// ####################
// サンプル値の変更
// ####################
size.addEventListener('input', (e) => {
  sample.style.fontSize = `${e.target.value}px`
})

weight.addEventListener('input', (e) => {
  sample.style.fontWeight = e.target.value
})

opacity.addEventListener('input', (e) => {
  sample.style.opacity = e.target.value
})

// ラジオボタンの値を取得する
Array.from(formats).map((e) =>
  e.addEventListener('click', () => {
    layoutDisabled(e.value)
    format = e.value
  })
)

// ####################
// WebSocket
// ####################
setInterval(() => {
  const id = cookie.split('=')[1]

  const layout = JSON.stringify({
    format: format,
    size: sample.style.fontSize,
    weight: sample.style.fontWeight,
    opacity: sample.style.opacity,
    id: id
  })

  socket.emit('Layout', layout)

  console.log(layout)
}, 5000)

// ####################
// 関数
// ####################

// 選択中のフォーマットを取得して、レイアウトの制限を行う
const layoutDisabled = (format) => {
  switch (format) {
    case 'niconico': {
      opacity.disabled = false
      break
    }
    case 'youtube': {
      opacity.disabled = true
      break
    }
  }
}
