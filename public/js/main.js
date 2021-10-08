const sample = document.querySelector('.sample')
const fontSize = document.querySelector('.fontSize')
const formats = document.getElementsByName('format')

const socket = io()

// Config.jsから初期値(共通の値)を読み込む
addEventListener('load', () => {
  sample.style.fontSize = Config.fontSize
})

fontSize.addEventListener('input', e => {
  sample.style.fontSize = `${e.target.value}px`
})

// formatのラジオボタンのvalueを取得する
const selectingFormat = () => {
  let format = ''
  for (let i = 0; i < formats.length; i++) {
    if (formats[i].checked) {
      format = formats[i].value
    }
  }

  return format
}

// 10秒毎に選択中のフォーマットを送信する
setInterval(() => {
  const format = JSON.stringify({
    format: selectingFormat()
  })

  socket.emit('Format', format)
}, 5000)

// 5秒毎にデータを送信する
setInterval(() => {
  const layout = JSON.stringify({
    size: sample.style.fontSize
  })

  socket.emit('Layout', layout)
}, 5000)
