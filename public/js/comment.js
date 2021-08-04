// screen - スクリーン

const screen = document.querySelector('.screen')
const button = document.querySelector('.button')

const socket = io()

window.addEventListener('DOMContentLoaded', () => {
  console.log('Hello')
})

socket.on('chat message', msg => {
  const comment = document.createElement('span')
  comment.innerHTML = msg
  comment.classList.add('comment')
  comment.classList.add('color-white')

  screen.appendChild(comment)
})

// setInterval(() => {
//   const comment = document.createElement('span')
//   comment.innerHTML = count
//   comment.classList.add('comment')
//   comment.classList.add('color-white')

//   if (toggle) {
//     comment.classList.remove('color-white')
//     comment.classList.add('color-blue')
//   }

//   screen.appendChild(comment)
//   count++

//   fetch('http://localhost:3000/screen', { method: 'POST' })
//     .then(res => res.json())
//     .then(res => console.log(res))
// }, 1000)
