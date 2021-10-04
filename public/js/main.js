const sample = document.querySelector('.sample')
const fontSize = document.querySelector('.fontSize')

const socket = io()

// Config.jsから初期値(共通の値)を読み込む
addEventListener('load', () => {
  sample.style.fontSize = `${Config.fontSize}px`
})

fontSize.addEventListener('input', e => {
  sample.style.fontSize = `${e.target.value}px`
})

// 5秒毎にデータを送信する
setInterval(() => {
  const Layout = JSON.stringify({
    size: sample.style.fontSize
  })

  socket.emit('layout', Layout)
}, 5000)
