// screen - スクリーン

const screen = document.querySelector('.screen')
const button = document.querySelector('.button')
let toggle = false
let count = 0

// DOMでscreenのspanを読み取って流す
window.addEventListener('load', () => {
  setInterval(() => {
    fetch('/', {
      method: 'POST',
      body: 'hello'
    })
  }, 3000)
})

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
}, 3000)

button.addEventListener('click', () => {
  if (toggle) {
    toggle = false
    console.log('toggle=false')
  } else {
    toggle = true
    console.log('toggle=true')
  }
})
