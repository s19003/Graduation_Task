// screen - スクリーン

const screen = document.querySelector('.screen')
const button = document.querySelector('.button')
let toggle = false
let count = 0

setInterval(() => {
  const comment = document.createElement('span')
  comment.innerHTML = count
  comment.classList.add('comment')
  comment.classList.add('color-white')

  if (toggle) {
    comment.classList.remove('color-white')
    comment.classList.add('color-blue')
  }

  screen.appendChild(comment)
  count++
}, 1000)

setInterval(() => {
  fetch('http://localhost:3000', { method: 'POST' })
    .then(res => res.json())
    .then(res => console.log(res))
}, 7000)
