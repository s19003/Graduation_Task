const button = document.querySelector('.button')
const sample = document.querySelector('.sample')
const size = document.querySelector('.fontSize')
const speed = document.querySelectorAll('.speed')
const checkbox = document.querySelector('.checkTwitter')

let fontSize = 30
let fontSpeed = 30
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
    check: check
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
      fontSpeed = 60
      break
    case '普通':
      fontSpeed = 40
      break
    case '速い':
      fontSpeed = 20
      break
    default:
      fontSpeed = 40
  }
}

/*
チェックボックス
*/

checkbox.addEventListener('change', e => {
  check = e.target.checked
})
