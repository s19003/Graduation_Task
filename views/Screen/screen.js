'use strict'

import { config } from '../config.js'

const socket = io()
const screen = document.querySelector('.screen')

let id = '' // クライアント識別ID

let format = config.format
let size = config.size
let color = config.color
let weight = config.weight
let opacity = config.opacity

// ページの読み込み完了後に実行
addEventListener('load', () => {
  const searchParams = new URLSearchParams(window.location.search)
  id = searchParams.get('id')
})

// ####################
// WebSocket
// ####################

socket.on('Layout', (layout) => {
  const getLayout = JSON.parse(layout)
  const getId = getLayout.id

  if (id === getId) {
    size = getLayout.size
    weight = getLayout.weight
    opacity = getLayout.opacity
    changeFormat(getLayout.format)
  }
})

// APIから受け取った時用
socket.on('Tweets', (tweets, clientId) => {
  if (compareId(clientId)) {
    if (tweets) {
      const length = tweets.data.length

      let tweetsArray = Array(length)
      for (let i = 0; i < length; i++) {
        tweetsArray[i] = tweets.data[i].text
      }

      for (let tweet of tweetsArray) {
        tweet = tweet.replace(/[#, ＃].*/g, '')
        tweet = tweet.replace(/https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/g, '')

        randomTime(tweet, 'twitter')
      }
    }
  } else {
    console.log('クライアントIDが違います')
  }
})

socket.on('Chats', (chats, clientId) => {
  try {
    if (compareId(clientId)) {
      if (chats) {
        const items = chats.items
        const length = items.length

        let chatsArray = Array(length)
        if (length) {
          for (let i = 0; i < length; i++) {
            chatsArray[i] = items[i].snippet.textMessageDetails.messageText
          }
        }

        for (const chat of chatsArray) {
          randomTime(chat, 'youtube')
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
})

// ####################
// 関数
// ####################

// フォーマットを切り替えるかどうか判定する関数
const changeFormat = (getFormat) => {
  if (format != getFormat) {
    screen.innerHTML = ''
  }

  // youtube切り替わった時のコンテナ作成
  if (format == 'niconico' && getFormat == 'youtube') {
    const container = document.createElement('div')
    container.classList.add('container')
    screen.appendChild(container)
  }

  format = getFormat
}

// ランダムな高さを返す関数
const randomHeight = () => `${Math.round(Math.random() * 500)}px`

// コメント作成関数
const createComment = (text, media) => {
  const width = document.documentElement.clientWidth
  const height = document.documentElement.clientHeight

  if (format == 'niconico') {
    const comment = document.createElement('div')
    comment.innerHTML = text

    // スタイルを指定
    comment.style.color = color
    comment.style.fontSize = size
    comment.style.fontWeight = weight
    comment.style.opacity = opacity
    comment.classList.add('niconico')

    mediaIcon(comment, media)
    screen.appendChild(comment)

    // アニメーションの追加
    comment.style.left = `${width}px`
    comment.style.top = randomHeight()

    const animationWidth = `-${width + comment.clientWidth}px`
    comment.style.setProperty('--translateX', animationWidth)

    comment.classList.add('animation')

    // コメントの削除
    setTimeout(() => comment.remove(), 30000)
  } else if (format == 'youtube') {
    const comment = document.createElement('div')
    comment.innerHTML = text

    comment.style.color = color
    comment.style.fontWeight = weight

    comment.classList.add('youtube')

    mediaIcon(comment, media)

    const container = document.querySelector('.container')
    container.appendChild(comment)

    container.scrollTop = container.scrollHeight
  }
}

const compareId = (clientId) => {
  return id == clientId ? true : false
}

const mediaIcon = (comment, media) => {
  switch (media) {
    case 'twitter':
      return comment.classList.add('twitterIcon')
    case 'youtube':
      return comment.classList.add('youtubeIcon')
  }
}

const randomTime = (comment, media) => {
  const random = Math.round(Math.random() * 7000)
  setTimeout(() => {
    createComment(comment, media)
  }, random)
}
