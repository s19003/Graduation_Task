// グローバルに使用する変数や定数
const screen = document.querySelector('.screen')
const socket = io()

let format = Config.format // "niconico"

let fontSize = Config.fontSize
let fontColor = Config.fontColor
let animationDuration = 50

// ==============================
// Socket
// ==============================

socket.on('Format', getFormat => {
  checkFormat(getFormat)
  createComment(format)
})

socket.on('Layout', getLayout => {
  getLayout = JSON.parse(getLayout)
  fontSize = getLayout.size
})

// ==============================
// 関数
// ==============================

// フォーマットを切り替えるかどうか判定する関数
const checkFormat = getFormat => {
  getFormat = JSON.parse(getFormat).format
  flag = format == getFormat ? true : false
  format = getFormat

  // 選択中と違う場合、フォーマットを変更する
  // その際、スクリーンの子要素を削除し、初期化する。
  if (!flag) {
    screen.innerHTML = ''
  }
}

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
