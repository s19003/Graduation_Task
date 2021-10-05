const screen = document.querySelector('.screen')

const socket = io()

// CSS
let format = Config.format

let fontSize = Config.fontSize
let fontColor = Config.fontColor
let animationDuration = 50

// ==============================
// Socket
// ==============================
socket.on('format', getFormat => {
  format = JSON.parse(getFormat).format

  createComment(format)
  console.log(fontSize)
})

const createComment = text => {
  const comment = document.createElement('p')

  comment.innerHTML = text
  comment.classList.add('common')

  comment.style.fontSize = fontSize
  comment.style.color = fontColor

  switch (format) {
    case 'niconico':
      comment.classList.add('niconico')
      comment.style.animationDuration = `50s`
      comment.style.animationName = `lane0`
      break
  }

  screen.appendChild(comment)
}

// socket.on('json', tweets => {
//   try {
//     if (tweets == undefined) {
//       console.log('undefined')
//       return
//     }

//     if (tweets.meta.result_count != 0) {
//       for (let i = tweets.meta.result_count; 0 < i; i--) {
//         if (counter < 9) {
//           counter++
//         } else {
//           counter = 0
//         }
//         createAnimation(tweets.data[i - 1], counter)
//         console.log(counter)
//       }
//     } else {
//       console.log('Tweetが無いです')
//     }
//   } catch (e) {
//     console.log(tweets)
//     console.log(e)
//   }
// })

// socket.on('layout', layout => {
//   const json = JSON.parse(layout)
//   fontSize = json.fontSize
//   animationDuration = json.fontSpeed
// })

// const createAnimation = (tweet, counter) => {
//   const comment = document.createElement('span')
//   comment.innerHTML = tweet.text
//   comment.classList.add('comment')
//   comment.style.fontSize = `${fontSize}px`
//   comment.style.animationDuration = `${animationDuration}s`
//   comment.style.animationName = `lane${counter}`
//   screen.appendChild(comment)
// }
