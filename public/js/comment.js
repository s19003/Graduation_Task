let counter = 0
const screen = document.querySelector('.screen')

const socket = io()

// CSS
let fontSize = 30
let color = 'white'

// window.addEventListener('DOMContentLoaded', () => {})

// ==============================
// Socket
// ==============================
socket.on('json', tweets => {
  try {
    if (tweets == undefined) {
      console.log('undefined')
      return
    }

    if (tweets.meta.result_count != 0) {
      for (let i = tweets.meta.result_count; 0 < i; i--) {
        if (counter < 9) {
          counter++
        } else {
          counter = 0
        }
        createAnimation(tweets.data[i - 1], counter)
        console.log(counter)
      }
    } else {
      console.log('Tweetが無いです')
    }
  } catch (e) {
    console.log(tweets)
    console.log(e)
  }
})

const createAnimation = (tweet, counter) => {
  const comment = document.createElement('span')
  comment.innerHTML = tweet.text
  comment.classList.add('comment')
  comment.style.animationName = `lane${counter}`
  screen.appendChild(comment)
}
