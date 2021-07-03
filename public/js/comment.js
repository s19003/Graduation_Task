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

  const obj = { name: '上原功也', age: count }

  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }

  fetch('/post', data)
  console.log(data)
  count++
}, 1000)

button.addEventListener('click', () => {
  if (toggle) {
    toggle = false
    console.log('toggle=false')
  } else {
    toggle = true
    console.log('toggle=true')
  }
})
