const Twitter = require('./twitter')

let twitter = new Twitter()

setInterval(async () => {
  const tweets = twitter.getTweets('ITカレッジ沖faefda縄')
}, 3000)

// setInterval(async () => {
//   console.log('変更')
//   console.log(twitter.getTweets(''))
// }, 10000)
