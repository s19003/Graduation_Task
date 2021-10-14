// グローバルに使用する変数や定数
const screen = document.querySelector('.screen')
const socket = io()

let format = Config.format // "niconico"

let fontSize = Config.fontSize
let fontColor = Config.fontColor

// ==============================
// Socket
// ==============================

socket.on('Format', getFormat => {
  checkFormat(getFormat)

  // ランダムな時間を指定(一律に流さない)
  const random = Math.floor(Math.random() * 5000)
  setTimeout(() => createComment(`テスト${random}`), random)
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

  // 選択中と違う場合、フォーマットを変更する
  // その際、スクリーンの子要素を削除し、初期化する。
  if (format != getFormat) {
    screen.innerHTML = ''
  }

  if (format == 'niconico' && getFormat == 'youtube') {
    const container = document.createElement('div')
    container.classList.add('container')
    screen.appendChild(container)
  }

  format = getFormat
}

const createComment = text => {
  // ブラウザの横幅・縦幅
  const width = document.documentElement.clientWidth
  const height = document.documentElement.clientHeight
  const icon = 'Twitter'

  switch (format) {
    case 'niconico':
      const Ncomment = document.createElement('div')
      Ncomment.innerHTML = text
      Ncomment.style.fontSize = fontSize
      Ncomment.style.color = fontColor

      Ncomment.classList.add('common')
      Ncomment.classList.add('niconico')

      // TwitterIcon or YoutubeIcon
      switch (icon) {
        case 'Twitter':
          Ncomment.classList.add('twitter')
          break
        case 'Youtube':
          Ncomment.classList.add('youtube')
          break
      }

      // アニメーションクラスを設定するために、
      // 要素を追加しておく必要がある。
      screen.appendChild(Ncomment)

      // 画面の右側の位置を取得する
      Ncomment.style.left = `${width}px`

      // 高さをランダムにする
      Ncomment.style.top = `${Math.round(Math.random() * 500)}px`

      // 横幅とコメント幅を求めることで、
      // 移動する範囲を取得し、:rootに設定する
      const animationWidth = `-${width + Ncomment.clientWidth}px`
      Ncomment.style.setProperty('--translateX', animationWidth)

      Ncomment.classList.add('animation')

      // 30秒後に要素を削除(変更の可能性あり)
      setTimeout(() => Ncomment.remove(), 30000)
      break
    case 'youtube':
      const Ycomment = document.createElement('div')
      Ycomment.innerHTML = text
      Ycomment.style.fontSize = fontSize
      Ycomment.style.color = fontColor

      Ycomment.classList.add('common')

      const container = document.querySelector('.container')

      container.appendChild(Ycomment)

      container.scrollTop = container.clientHeight
      console.log(container.clientHeight)

      // setTimeout(() => Ycomment.remove(), 60000)

      break
  }
}
