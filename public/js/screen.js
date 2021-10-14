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

  // ランダムな時間を指定(一律に流さない)
  const random = Math.floor(Math.random() * 5000)
  setTimeout(() => createComment('テスト'), random)
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
  // ブラウザの横幅・縦幅
  const width = document.documentElement.clientWidth
  const height = document.documentElement.clientHeight
  const icon = 'Twitter'

  switch (format) {
    case 'niconico':
      const comment = document.createElement('div')
      comment.innerHTML = text
      comment.style.fontSize = fontSize
      comment.style.color = fontColor

      comment.classList.add('common')
      comment.classList.add('niconico')

      // TwitterIcon or YoutubeIcon
      switch (icon) {
        case 'Twitter':
          comment.classList.add('twitter')
          break
        case 'Youtube':
          comment.classList.add('youtube')
          break
      }

      // 画面の右端から開始する
      comment.style.left = `${width}px`

      // 高さをランダムにする
      comment.style.top = `${Math.round(Math.random() * 500)}px`

      screen.appendChild(comment)

      // 横幅とコメント幅を求めることで、
      // 移動する範囲を取得・CSSに設定する
      const animationWidth = `-${width + comment.clientWidth}px`
      comment.style.setProperty('--translateX', animationWidth)

      comment.classList.add('animation')

      // 60秒後に要素を削除
      setTimeout(() => comment.remove(), 30000)
      break
    case 'youtube':
      break
  }
}
