const button = document.querySelector('.button')

const socket = io()

window.addEventListener('DOMContentLoaded', () => {
  socket.emit('initialize', '初期化')
})

button.addEventListener('click', () => {
  socket.emit('settings', true)
})
