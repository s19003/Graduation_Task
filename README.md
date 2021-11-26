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
>>> http://localhost:3000/main
```

### 構成

- サーバ
  - 使用ライブラリ
    - Node.js
    - Express
    - Socket.IO
  - リポジトリ
    - app.js
    - API/twitter.js <-- TwitterAPI
    - API/youtube.js <-- YoutubeAPI
- フロント
  - 使用ライブラリ
    - Socket.IO
    - ejs
  - リポジトリ
    - views/main\* <-- メイン画面
    - views/screen\* <-- スクリーン画面
    - img <-- 画像
    - config.js <-- 初期値設定 js
