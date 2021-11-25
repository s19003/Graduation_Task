## 卒研プロトタイプ(Graduation_Task)

### 使い方

```
git clone https://github.com/s19003/Graduation_Task.git
```

```
npm install
```

```
node app.js
```

### 構成

- サーバ
  - 使用ライブラリ
    - Node.js
    - Express
    - Socket.IO
  - リポジトリ
    - app.js
    - API/twitter.js <-- tweet 取得
    - API/youtube.js <-- chat 取得
- フロント
  - 使用ライブラリ
    - Socket.IO
    - ejs
  - リポジトリ
    - views/main\* <- メイン画面
    - views/screen\* <- スクリーン画面
    - img
    - config.js <- 初期値設定 js
