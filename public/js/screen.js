// グローバルに使用する変数や定数
const screen = document.querySelector('.screen')
const socket = io()

let format = Config.format // "niconico"

let fontSize = Config.fontSize
let fontColor = Config.fontColor

// ==============================
// Socket
// ==============================

socket.on('Format', (getFormat) => {
  checkFormat(getFormat)

  // テスト用
  sampleCreate()
})

socket.on('Layout', (getLayout) => {
  getLayout = JSON.parse(getLayout)
  fontSize = getLayout.size
})

// APIから受け取った時用
socket.on('API', (json) => {
  const text = json.text
  createComment(text)
})

// ==============================
// 関数
// ==============================

// フォーマットを切り替えるかどうか判定する関数
const checkFormat = (getFormat) => {
  getFormat = JSON.parse(getFormat).format

  // 選択中と違う場合、フォーマットを変更する
  // その際、スクリーンの子要素を削除し、初期化する。
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

// 高さが重ならないように求める関数
let preHeight = -1
const notOverlap = () => {
  let randomHeight = Math.round(Math.random() * 500)

  // 前のコメントが近い場合はもう一度計算する
  if (preHeight - 100 < randomHeight && randomHeight < preHeight + 100) {
    notOverlap()
  }

  preHeight = randomHeight
  return `${randomHeight}px`
}

const createComment = (text) => {
  // ブラウザの横幅・縦幅
  const width = document.documentElement.clientWidth
  const height = document.documentElement.clientHeight
  // ランダムなアイコン
  const icon = Math.round(Math.random())

  switch (format) {
    case 'niconico':
      const Ncomment = document.createElement('div')
      Ncomment.innerHTML = text
      Ncomment.style.fontSize = fontSize
      Ncomment.style.color = fontColor

      // Ncomment.classList.add('common')
      Ncomment.classList.add('niconico')

      // TwitterIcon or YoutubeIcon
      switch (icon) {
        case 0:
          Ncomment.classList.add('twitterIcon')
          break
        case 1:
          Ncomment.classList.add('youtubeIcon')
          break
      }

      // アニメーションクラスを設定するために、
      // 要素を追加しておく必要がある。
      screen.appendChild(Ncomment)

      // 画面の右側の位置を取得する
      Ncomment.style.left = `${width}px`

      // 高さをランダムにする
      Ncomment.style.top = notOverlap()

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
      // Ycomment.style.fontSize = fontSize
      // Ycomment.style.lineHeight = fontSize
      // Ycomment.style.color = fontColor

      // Ycomment.classList.add('common')
      Ycomment.classList.add('youtube')

      // TwitterIcon or YoutubeIcon
      switch (icon) {
        case 0:
          Ycomment.classList.add('twitterIcon')
          break
        case 1:
          Ycomment.classList.add('youtubeIcon')
          break
      }

      const container = document.querySelector('.container')
      container.appendChild(Ycomment)

      // スクロールしたら位置が変わるようにする
      container.scrollTop = container.scrollHeight

      // setTimeout(() => Ycomment.remove(), 60000)

      break
  }
}

// 開発用のサンプルコメント作成関数
const sampleCreate = () => {
  const test = 'テスト'.repeat(Math.floor(Math.random() * 10))
  const randomTime = Math.floor(Math.random() * 5000)

  setTimeout(() => {
    createComment(`${test}${randomTime}`)
  }, randomTime)
}
