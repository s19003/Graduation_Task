//スクロール量をコンソールに表示する処理
let target = document.getElementById('target')
target.onscroll = () => console.log(target.scrollTop)

//ボタンを押したらスクロール位置400に移動する処理
let actionButton = document.getElementById('actionButton')
actionButton.onclick = () => (target.scrollTop = 400)
