// screen - スクリーン

const screen = document.querySelector('.screen')

const socket = io()

window.addEventListener('DOMContentLoaded', () => {})

// ==============================
// Socket
// ==============================
socket.on('send json', msg => {
  // const comment = document.createElement('span')
  // comment.innerHTML = msg
  // comment.classList.add('comment')
  // comment.classList.add('color-white')
  // screen.appendChild(comment)

  console.log(msg)
})
