const Twitter = require('./twitter')

let twitter = new Twitter()

setInterval(async () => {
  const tweets = twitter.getTweets('猫')
}, 3000)

// setInterval(async () => {
//   twitter.getTweets('')
// }, 10000)
