// screen - スクリーン
// button - ボタン(検証用)
// text - Formテキスト(検証用)

const screen = document.querySelector('.screen')
const button = document.querySelector('.button')
const text = document.querySelector('.text')

let count = 0

button.addEventListener('click', () => {
  let content = text.value

  const test = document.createElement('span')
  test.innerHTML = content

  switch (count) {
    case 0:
      test.classList.add('comment')
      screen.appendChild(test)
      count = 1
      break
    case 1:
      test.classList.add('comment2')
      screen.appendChild(test)
      count = 2
      break
    case 2:
      test.classList.add('comment3')
      screen.appendChild(test)
      count = 0
      break
  }

  console.log(test)
})

setInterval(() => {
  const comment = document.createElement('span')
  comment.innerHTML = 'Hello World!!'
  comment.classList.add('comment')
  screen.appendChild(comment)
}, 2000)
