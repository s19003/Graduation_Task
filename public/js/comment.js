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

fetch('http://localhost:3000/screen')
  .then(response => response.text())
  .then(text => console.log(text))
