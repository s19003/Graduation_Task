# HTTPモジュール
Node.jsには、HTTPサーバーやHTTPクライアントを実装したHTTPモジュールが用意されています。<br>
Node.jsでWebアプリケーションを作成する場合に、一般的に使用されるAPIの一つです。<br>
```
const http = require('http')
```

### http.createServer(\[options]\[,requestListener] : http.Server<br>
HTTPサーバーを作成するには、http.createServer関数を使用します。<br>
戻り値はhttp.Serverのため、http.Serverクラスで定義されてるイベントハンドラーを呼び出すことが出来ます。<br>
```
const server = http.createServer((req, res) => {
  // ここにリクエストに対する処理を記述
}
```

### server.listen(port, \[hostname])<br>
サーバーを実行する。<br>
```
const port = 3000
const hostname = '127.0.0.1'

server.listen(port, hostname)
```
