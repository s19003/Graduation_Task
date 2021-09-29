const Twitter = require('./twitter')

let twitter = new Twitter()

setInterval(async () => {
  const tweets = await twitter.getTweets('猫')
  console.log(JSON.stringify(tweets))
}, 5000)

setInterval(async () => {
  twitter.tag = 'hoge'
  console.log('変更しました')
}, 21000)
