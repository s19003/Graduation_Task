const needle = require('needle')
const token =
  'AAAAAAAAAAAAAAAAAAAAALLrPgEAAAAAB3OxZwMf%2F7CKsr1YHsr3RTslT0A%3DQ0SpG0yAaNmHL5tf7aHbHdb1fzS2ov2bo1Yevy6pr0NjJ2JzM8'
const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent'

class Twitter {
  constructor() {
    this.tag = ''
    this.newest = ''
  }

  getTweets = async (tag = '') => {
    try {
      const T = this.checkTag(tag)
      let tweets = ''

      switch (T) {
        case -1:
          break
        case 0:
          const meta = await this.getRequest(tag)
          if (meta.meta.newest_id !== undefined) {
            this.newest = meta.meta.newest_id
          }
          break
        case 1:
          tweets = await this.getRequest(tag, this.newest)
          if (tweets.meta.newest_id !== undefined) {
            this.newest = tweets.meta.newest_id
          }
          console.log(tweets)
          break
      }

      return tweets
    } catch (e) {
      console.log(e)
    }
  }

  // タグ判定
  checkTag = (tag) => {
    if (tag == '') {
      this.tag = ''
      this.newest = ''
      console.log('初期化')
      return -1
    }

    // 初回判定
    if (this.tag == '') {
      this.tag = tag
      this.newest = ''
      console.log('初回入力')
      return 0
    }

    // 前回と同じタグの時
    if (this.tag == tag) {
      console.log('同じタグ')
      return 1
    }

    // 前回と異なるタグの時
    if (this.tag != tag) {
      this.tag = tag
      this.newest = ''
      console.log('変更')
      return 0
    }
  }

  getRequest = async (tag, newest = '') => {
    let params
    let res
    if (newest == '') {
      params = {
        query: `#${tag} -is:retweet`,
        'tweet.fields': 'author_id'
      }
    } else {
      params = {
        query: `#${tag} -is:retweet`,
        'tweet.fields': 'author_id',
        since_id: `${newest}`
      }
    }

    res = await needle('get', endpointUrl, params, {
      headers: {
        'User-Agent': 'v2RecentSearchJS',
        authorization: `Bearer ${token}`
      }
    })

    if (res.body) {
      return res.body
    } else {
      throw new Error('リクエストに失敗しました。')
    }
  }
}

module.exports = Twitter
