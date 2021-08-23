const button = document.querySelector('.button')
const sample = document.querySelector('.sample')
const size = document.querySelector('.fontSize')
const speed = document.querySelectorAll('.speed')
const checkbox = document.querySelector('.checkTwitter')
const twittertag = document.querySelector('.twitterTag')

let fontSize = 30
let fontSpeed = 50
let tag = ''
let check = false

const socket = io()

window.addEventListener('load', () => {
  socket.emit('initialize', '初期化')
})

button.addEventListener('click', () => {
  let settings = {
    fontSize: fontSize,
    fontSpeed: fontSpeed,
    check: check,
    tag: tag
  }
  settings = JSON.stringify(settings)
  console.log(settings)
  socket.emit('settings', settings)
})

/*
フォントサイズ
*/

size.addEventListener('input', e => {
  sample.style.fontSize = `${e.target.value}px`
  fontSize = e.target.value
})

/*
スピード
*/

speed.forEach(value => {
  value.addEventListener('click', () => {
    valueSpeed(value.value)
    console.log(fontSpeed)
  })
})

const valueSpeed = value => {
  switch (value) {
    case '遅い':
      fontSpeed = 80
      break
    case '普通':
      fontSpeed = 50
      break
    case '速い':
      fontSpeed = 30
      break
    default:
      fontSpeed = 50
  }
}

/*
チェックボックス
*/

checkbox.addEventListener('change', e => {
  check = e.target.checked
})

/*
Twitterハッシュタグ
*/

twittertag.addEventListener('input', e => {
  tag = twittertag.value
})
