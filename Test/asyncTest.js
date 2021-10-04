// // 配列を作成
// const listFunctions = []

// // レーン用の配列
// usingLane = []
// ms = 0

// // 動的に関数を追加
// for (let i = 0; i < 5; i++) {
//   min = 1000 // 1秒
//   max = 5000 // 5秒
//   ms = random()

//   // 1秒後に処理をする非同期関数を作成
//   const func = resolve => {
//     // 遅延処理
//     setTimeout(() => {
//       console.log(`関数${ms}が完了しました`)

//       resolve()
//     }, ms)
//   }

//   // 配列に追加
//   listFunctions.push(func)
// }

// const execute = async () => {
//   // 非同期処理を順番に実行
//   for (let i = 0; i < listFunctions.length; i++) {
//     const func = listFunctions[i]
//     await new Promise(func)

//     // レーン
//     // lane = selectLane()

//     setTimeout(() => {
//       console.log(`${ms}でした`)
//     }, ms)
//   }
// }

// execute()

// const random = () => {
//   return Math.floor(Math.random() * (max - min + 1) + min)
// }

// const selectLane = () => {
//   // リストが空白(length=0)の場合
//   if (!usingLane.length) {
//     console.log('空白だったので、0レーンを返します')
//     usingLane.push(0)
//     return 0
//   }

//   // リストが空白(length>=1)以外の場合
//   if (usingLane.length) {
//     console.log('空白じゃなかったので、1以上のレーンを返します')
//     console.log(usingLane.length)
//     return
//   }
// }

class Test {
  static min = 1000
  static max = 5000
  static ms = 0

  static randomMS = () => {
    this.ms = Math.floor(Math.random() * (this.max - this.min + 1) + this.min)
  }

  randomTest = () => {
    return 100
  }

  getString = () => {
    console.log(this.ms)
  }
}

hoge = new Test()

hoge.getString()
